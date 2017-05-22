## Classes

<dl>
<dt><a href="#Cashr">Cashr</a> ⇐ <code>EventEmitter</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#GetOptions">GetOptions</a> : <code>Object</code></dt>
<dd><p>Options to provide to a call to get</p>
</dd>
<dt><a href="#SetOptions">SetOptions</a> : <code>Object</code></dt>
<dd><p>Options to provide to a call to set</p>
</dd>
<dt><a href="#CacheOptions">CacheOptions</a> : <code>Object</code></dt>
<dd><p>Options to provide to the constructor of a cache</p>
</dd>
<dt><a href="#CacheEntry">CacheEntry</a> : <code>Object</code></dt>
<dd><p>An entry in the cache</p>
</dd>
</dl>

<a name="Cashr"></a>

## Cashr ⇐ <code>EventEmitter</code>
**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [Cashr](#Cashr) ⇐ <code>EventEmitter</code>
    * _instance_
        * [.timeouts](#Cashr+timeouts) : <code>Map.&lt;string, number&gt;</code>
        * [.storage](#Cashr+storage) : <code>Map.&lt;string, any&gt;</code>
        * [.settings](#Cashr+settings) : [<code>CacheOptions</code>](#CacheOptions)
        * [.size](#Cashr+size) : <code>number</code>
        * [.values](#Cashr+values) : <code>Array.&lt;any&gt;</code>
        * [.keys](#Cashr+keys) : <code>Array.&lt;string&gt;</code>
        * [.entries](#Cashr+entries) : [<code>Array.&lt;CacheEntry&gt;</code>](#CacheEntry)
        * [.set(key, value, [options])](#Cashr+set)
        * [.delete(key)](#Cashr+delete) ⇒
        * [.clear()](#Cashr+clear)
        * [._cancelTimeout(key)](#Cashr+_cancelTimeout) ⇒ <code>boolean</code>
        * [._startTimeout(key)](#Cashr+_startTimeout)
        * ["valueTimeout" (key, value)](#Cashr+event_valueTimeout)
    * _static_
        * [.Cashr](#Cashr.Cashr)
            * [new Cashr(settings)](#new_Cashr.Cashr_new)

<a name="Cashr+timeouts"></a>

### cashr.timeouts : <code>Map.&lt;string, number&gt;</code>
The map of timeouts

**Kind**: instance property of [<code>Cashr</code>](#Cashr)  
**Read only**: true  
<a name="Cashr+storage"></a>

### cashr.storage : <code>Map.&lt;string, any&gt;</code>
The internal storage map

**Kind**: instance property of [<code>Cashr</code>](#Cashr)  
**Read only**: true  
<a name="Cashr+settings"></a>

### cashr.settings : [<code>CacheOptions</code>](#CacheOptions)
The settings for this cache

**Kind**: instance property of [<code>Cashr</code>](#Cashr)  
**Read only**: true  
<a name="Cashr+size"></a>

### cashr.size : <code>number</code>
The size of this cache

**Kind**: instance property of [<code>Cashr</code>](#Cashr)  
**Read only**: true  
<a name="Cashr+values"></a>

### cashr.values : <code>Array.&lt;any&gt;</code>
The values of this cache

**Kind**: instance property of [<code>Cashr</code>](#Cashr)  
**Read only**: true  
<a name="Cashr+keys"></a>

### cashr.keys : <code>Array.&lt;string&gt;</code>
The keys of this cache

**Kind**: instance property of [<code>Cashr</code>](#Cashr)  
**Read only**: true  
<a name="Cashr+entries"></a>

### cashr.entries : [<code>Array.&lt;CacheEntry&gt;</code>](#CacheEntry)
The entries of this cache

**Kind**: instance property of [<code>Cashr</code>](#Cashr)  
**Read only**: true  
<a name="Cashr+set"></a>

### cashr.set(key, value, [options])
Sets a value at a given key

**Kind**: instance method of [<code>Cashr</code>](#Cashr)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | The key of the property to set |
| value | <code>any</code> |  | The value to set |
| [options] | [<code>SetOptions</code>](#SetOptions) | <code>{ preventTimeout: true }</code> |  |

<a name="Cashr+delete"></a>

### cashr.delete(key) ⇒
Deletes the value at the given key

**Kind**: instance method of [<code>Cashr</code>](#Cashr)  
**Returns**: The value that was stored under that key  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key of the property to delete |

<a name="Cashr+clear"></a>

### cashr.clear()
Clears all data from the cache

**Kind**: instance method of [<code>Cashr</code>](#Cashr)  
<a name="Cashr+_cancelTimeout"></a>

### cashr._cancelTimeout(key) ⇒ <code>boolean</code>
Cancels any timeouts for a given key

**Kind**: instance method of [<code>Cashr</code>](#Cashr)  
**Returns**: <code>boolean</code> - Whether or not there were any timeouts to cancel  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to cancel timeouts for |

<a name="Cashr+_startTimeout"></a>

### cashr._startTimeout(key)
Starts a timeout for a key

**Kind**: instance method of [<code>Cashr</code>](#Cashr)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to time out |

<a name="Cashr+event_valueTimeout"></a>

### "valueTimeout" (key, value)
Called when a value times out

**Kind**: event emitted by [<code>Cashr</code>](#Cashr)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key of the value that timed out |
| value | <code>any</code> | The value that timed out |

<a name="Cashr.Cashr"></a>

### Cashr.Cashr
**Kind**: static class of [<code>Cashr</code>](#Cashr)  
<a name="new_Cashr.Cashr_new"></a>

#### new Cashr(settings)
Constructs a new cache


| Param | Type |
| --- | --- |
| settings | [<code>CacheOptions</code>](#CacheOptions) | 

<a name="GetOptions"></a>

## GetOptions : <code>Object</code>
Options to provide to a call to get

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| default | <code>any</code> | The default value to return if none is found in storage |
| preventTimeout | <code>boolean</code> | Whether or not to reset the timeout of the value |

<a name="SetOptions"></a>

## SetOptions : <code>Object</code>
Options to provide to a call to set

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| preventTimeout | <code>boolean</code> | Whether or not to reset the timeout of the value |

<a name="CacheOptions"></a>

## CacheOptions : <code>Object</code>
Options to provide to the constructor of a cache

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timeoutDelay | <code>number</code> | The timeout delay, or 0 to indicate no timeout |

<a name="CacheEntry"></a>

## CacheEntry : <code>Object</code>
An entry in the cache

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key of the entry |
| value | <code>any</code> | The value of the entry |

