const EventEmitter = require('events').EventEmitter;

/**
 * Options to provide to a call to get
 * @typedef {Object} GetOptions
 * @property {any} default The default value to return if none is found in storage
 * @property {boolean} preventTimeout Whether or not to reset the timeout of the value
 */

/**
 * Options to provide to a call to set
 * @typedef {Object} SetOptions
 * @property {boolean} preventTimeout Whether or not to reset the timeout of the value
 */

/** 
 * Options to provide to the constructor of a cache
 * @typedef {Object} CacheOptions
 * @property {number} timeoutDelay The timeout delay, or 0 to indicate no timeout 
 */

/**
 * An entry in the cache
 * @typedef {Object} CacheEntry
 * @property {string} key The key of the entry
 * @property {any} value The value of the entry
 */

/**
 * @class Cashr
 * @extends {EventEmitter}
 */
class Cashr extends EventEmitter {
    /**
     * Constructs a new cache
     * @param {CacheOptions} settings
     * 
     * @memberof Cashr
     */
    constructor(settings) {
        super();

        this._timeouts = new Map();
        this._storage = new Map();
        this._settings = settings;
    }

    /**
     * The map of timeouts
     * 
     * @type {Map<string, number>}
     * 
     * @readonly
     * 
     * @memberof Cashr
     */
    get timeouts() {
        return this._timeouts;
    }

    /**
     * The internal storage map
     * 
     * @type {Map<string, any>}
     * 
     * @readonly
     * 
     * @memberof Cashr
     */
    get storage() {
        return this._storage;
    }

    /**
     * The settings for this cache
     * 
     * @type {CacheOptions}
     * 
     * @readonly
     * 
     * @memberof Cashr
     */
    get settings() {
        return this._settings;
    }

    /**
     * The size of this cache
     * 
     * @type {number}
     * 
     * @readonly
     * 
     * @memberof Cashr
     */
    get size() {
        return this.storage.size;
    }

    /**
     * The values of this cache
     * 
     * @type {Array<any>}
     * 
     * @readonly
     * 
     * @memberof Cashr
     */
    get values() {
        return Array.from(this.storage.values());
    }

    /**
     * The keys of this cache
     * 
     * @type {Array<string>}
     * 
     * @readonly
     * 
     * @memberof Cashr
     */
    get keys() {
        return Array.from(this.storage.keys());
    }

    /**
     * The entries of this cache
     * 
     * @type {Array<CacheEntry>}
     * 
     * @readonly
     * 
     * @memberof Cashr
     */
    get entries() {
        return Array.from(this.storage.entries()).map(item => ({ key: item[0], value: item[1] }));
    }

    /**
     * Returns the value stored at the given key
     * 
     * @param {string} key The key of the property to get
     * @param {GetOptions} [options={ preventTimeout: true }]  The options
     * 
     * @returns {any} The data stored at the given key, the default value (if provided), or undefined
     * 
     * @memberof ObjectStorage
     */
    get(key, options = { preventTimeout: true }) {
        const value = this.storage.get(key);

        if (value === undefined && options.default !== undefined) {
            return options.default;
        }

        if (options.preventTimeout) {
            this._startTimeout(key);
        }

        return value;
    }

    /**
     * Sets a value at a given key
     * 
     * @param {string} key The key of the property to set
     * @param {any} value The value to set
     * @param {SetOptions} [options={ preventTimeout: true }] 
     * 
     * @memberof Cashr
     */
    set(key, value, options = { preventTimeout: true }) {
        this.storage.set(key, value);

        if (options.preventTimeout) {
            this._startTimeout(key);
        }
    }


    /**
     * Deletes the value at the given key
     * 
     * @param {string} key The key of the property to delete
     * @returns The value that was stored under that key
     * 
     * @memberof Cashr
     */
    delete(key) {
        const value = this.storage.get(key);
        this.storage.delete(key);

        this._cancelTimeout(key);

        return value;
    }

    /**
     * Clears all data from the cache
     * 
     * @memberof Cashr
     */
    clear() {
        for (const key in this.storage.keys()) {
            this._cancelTimeout(key);
        }

        this.storage.clear();
        this.timeouts.clear();
    }

    /**
     * Cancels any timeouts for a given key
     * 
     * @param {string} key The key to cancel timeouts for
     * 
     * @returns {boolean} Whether or not there were any timeouts to cancel
     * 
     * @memberof Cashr
     */
    _cancelTimeout(key) {
        const oldTimeout = this.timeouts.get(key);

        if (oldTimeout !== undefined) {
            clearTimeout(oldTimeout);
            this.timeouts.delete(key);

            return true;
        }

        return false;
    }

    /**
     * Starts a timeout for a key
     * 
     * @param {string} key The key to time out
     * 
     * @memberof Cashr
     */
    _startTimeout(key) {
        this._cancelTimeout(key);

        if (this.settings.timeoutDelay > 0) {
            const handle = setTimeout(function () {
                const value = this.storage.get(key);

                this.emit('valueTimeout', key, value);
                this.storage.delete(key);
            }.bind(this), this.settings.timeoutDelay);

            this.timeouts.set(key, handle);
        }
    }
}

/**
 * Called when a value times out
 * @event Cashr#valueTimeout
 * @param {string} key The key of the value that timed out
 * @param {any} value The value that timed out
 */

module.exports = Cashr;