/* tslint:disable */
/* eslint-disable */

import { websocket_transport } from './snippets/libp2p-wasm-ext-2e7aa19fa5e25979/src/websockets.js';

let wasm;

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0 () {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }

  return cachedUint8Memory0;
}

function getStringFromWasm0 (ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject (obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;

  heap_next = heap[idx];

  heap[idx] = obj;

  return idx;
}

function getObject (idx) { return heap[idx]; }

function dropObject (idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject (idx) {
  const ret = getObject(idx);

  dropObject(idx);

  return ret;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
  ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
  }
  : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);

    view.set(buf);

    return {
      read: arg.length,
      written: buf.length
    };
  });

function passStringToWasm0 (arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length);

    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;

    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len);

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);

    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }

    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;

  return ptr;
}

function isLikeNone (x) {
  return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0 () {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }

  return cachedInt32Memory0;
}

function debugString (val) {
  // primitive types
  const type = typeof val;

  if (type == 'number' || type == 'boolean' || val == null) {
    return `${val}`;
  }

  if (type == 'string') {
    return `"${val}"`;
  }

  if (type == 'symbol') {
    const description = val.description;

    if (description == null) {
      return 'Symbol';
    } else {
      return `Symbol(${description})`;
    }
  }

  if (type == 'function') {
    const name = val.name;

    if (typeof name === 'string' && name.length > 0) {
      return `Function(${name})`;
    } else {
      return 'Function';
    }
  }

  // objects
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = '[';

    if (length > 0) {
      debug += debugString(val[0]);
    }

    for (let i = 1; i < length; i++) {
      debug += ', ' + debugString(val[i]);
    }

    debug += ']';

    return debug;
  }

  // Test for built-in
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;

  if (builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    // Failed to match the standard '[object ClassName]'
    return toString.call(val);
  }

  if (className == 'Object') {
    // we're a user defined class or Object
    // JSON.stringify avoids problems with cycles, and is generally much
    // easier than looping through ownProperties of `val`.
    try {
      return 'Object(' + JSON.stringify(val) + ')';
    } catch (_) {
      return 'Object';
    }
  }

  // errors
  if (val instanceof Error) {
    return `${val.name}: ${val.message}\n${val.stack}`;
  }

  // TODO we could test for more things here, like `Set`s and `Map`s.
  return className;
}

function makeMutClosure (arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };

  const real = (...args) => {
    // First up with a closure we increment the internal reference
    // count. This ensures that the Rust closure environment won't
    // be deallocated while we're invoking it.
    state.cnt++;
    const a = state.a;

    state.a = 0;

    try {
      return f(a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
      } else {
        state.a = a;
      }
    }
  };

  real.original = state;

  return real;
}

function __wbg_adapter_28 (arg0, arg1, arg2) {
  wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__he8207c3660c09238(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_31 (arg0, arg1) {
  wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hf665a9151ca393f9(arg0, arg1);
}

/**
* @param {string} auth_header
* @param {string} payload
* @param {string} client_identity
* @param {string} client_addr
* @param {boolean} enable_log
* @returns {Promise<string>}
*/
export function ext_run_keygen (auth_header, payload, client_identity, client_addr, enable_log) {
  const ptr0 = passStringToWasm0(auth_header, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len0 = WASM_VECTOR_LEN;
  const ptr1 = passStringToWasm0(payload, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len1 = WASM_VECTOR_LEN;
  const ptr2 = passStringToWasm0(client_identity, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len2 = WASM_VECTOR_LEN;
  const ptr3 = passStringToWasm0(client_addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len3 = WASM_VECTOR_LEN;
  const ret = wasm.ext_run_keygen(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, enable_log);

  return takeObject(ret);
}

/**
* @param {string} auth_header
* @param {string} payload
* @param {string} local_key
* @param {string} client_identity
* @param {string} client_addr
* @param {boolean} enable_log
* @returns {Promise<string>}
*/
export function ext_run_sign (auth_header, payload, local_key, client_identity, client_addr, enable_log) {
  const ptr0 = passStringToWasm0(auth_header, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len0 = WASM_VECTOR_LEN;
  const ptr1 = passStringToWasm0(payload, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len1 = WASM_VECTOR_LEN;
  const ptr2 = passStringToWasm0(local_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len2 = WASM_VECTOR_LEN;
  const ptr3 = passStringToWasm0(client_identity, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len3 = WASM_VECTOR_LEN;
  const ptr4 = passStringToWasm0(client_addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len4 = WASM_VECTOR_LEN;
  const ret = wasm.ext_run_sign(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, enable_log);

  return takeObject(ret);
}

/**
* @param {string} auth_header
* @param {string} payload
* @param {string} client_identity
* @param {string} client_addr
* @param {boolean} enable_log
* @returns {Promise<string>}
*/
export function ext_run_key_refreh (auth_header, payload, client_identity, client_addr, enable_log) {
  const ptr0 = passStringToWasm0(auth_header, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len0 = WASM_VECTOR_LEN;
  const ptr1 = passStringToWasm0(payload, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len1 = WASM_VECTOR_LEN;
  const ptr2 = passStringToWasm0(client_identity, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len2 = WASM_VECTOR_LEN;
  const ptr3 = passStringToWasm0(client_addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len3 = WASM_VECTOR_LEN;
  const ret = wasm.ext_run_key_refreh(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, enable_log);

  return takeObject(ret);
}

function handleError (f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}

function getArrayU8FromWasm0 (ptr, len) {
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedUint32Memory0 = null;

function getUint32Memory0 () {
  if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
    cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
  }

  return cachedUint32Memory0;
}

function passArrayJsValueToWasm0 (array, malloc) {
  const ptr = malloc(array.length * 4);
  const mem = getUint32Memory0();

  for (let i = 0; i < array.length; i++) {
    mem[ptr / 4 + i] = addHeapObject(array[i]);
  }

  WASM_VECTOR_LEN = array.length;

  return ptr;
}

function __wbg_adapter_121 (arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen__convert__closures__invoke2_mut__he07b26b847afeaa7(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

async function load (module, imports) {
  if (typeof Response === 'function' && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === 'function') {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get('Content-Type') != 'application/wasm') {
          console.warn('`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n', e);
        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();

    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}

function getImports () {
  const imports = {};

  imports.wbg = {};

  imports.wbg.__wbindgen_string_new = function (arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);

    return addHeapObject(ret);
  };

  imports.wbg.__wbindgen_cb_drop = function (arg0) {
    const obj = takeObject(arg0).original;

    if (obj.cnt-- == 1) {
      obj.a = 0;

      return true;
    }

    const ret = false;

    return ret;
  };

  imports.wbg.__wbindgen_object_drop_ref = function (arg0) {
    takeObject(arg0);
  };

  imports.wbg.__wbg_new_abda76e883ba8a5f = function () {
    const ret = new Error();

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_stack_658279fe44541cf6 = function (arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;

    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };

  imports.wbg.__wbg_error_f851667af71bcfc6 = function (arg0, arg1) {
    try {
      console.error(getStringFromWasm0(arg0, arg1));
    } finally {
      wasm.__wbindgen_free(arg0, arg1);
    }
  };

  imports.wbg.__wbg_dial_6157af8e109f4814 = function () {
    return handleError(function (arg0, arg1, arg2, arg3) {
      const ret = getObject(arg0).dial(getStringFromWasm0(arg1, arg2), arg3 !== 0);

      return addHeapObject(ret);
    }, arguments);
  };

  imports.wbg.__wbg_listenon_907f6c6cc58cbbc8 = function () {
    return handleError(function (arg0, arg1, arg2) {
      const ret = getObject(arg0).listen_on(getStringFromWasm0(arg1, arg2));

      return addHeapObject(ret);
    }, arguments);
  };

  imports.wbg.__wbg_read_3bccde29b650bec6 = function (arg0) {
    const ret = getObject(arg0).read;

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_newaddrs_c05d28600d5f5030 = function (arg0, arg1) {
    const ret = getObject(arg1).new_addrs;
    const ptr0 = isLikeNone(ret) ? 0 : passArrayJsValueToWasm0(ret, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;

    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };

  imports.wbg.__wbg_newconnections_b02386a63b08b62a = function (arg0, arg1) {
    const ret = getObject(arg1).new_connections;
    const ptr0 = isLikeNone(ret) ? 0 : passArrayJsValueToWasm0(ret, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;

    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };

  imports.wbg.__wbindgen_object_clone_ref = function (arg0) {
    const ret = getObject(arg0);

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_localaddr_2bc4cf8ea445e3e7 = function (arg0, arg1) {
    const ret = getObject(arg1).local_addr;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;

    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };

  imports.wbg.__wbg_observedaddr_2c0b66939a03e8b3 = function (arg0, arg1) {
    const ret = getObject(arg1).observed_addr;
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;

    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };

  imports.wbg.__wbg_connection_c4e0c4566cdbca81 = function (arg0) {
    const ret = getObject(arg0).connection;

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_expiredaddrs_3b2f69ef969bb11b = function (arg0, arg1) {
    const ret = getObject(arg1).expired_addrs;
    const ptr0 = isLikeNone(ret) ? 0 : passArrayJsValueToWasm0(ret, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;

    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };

  imports.wbg.__wbindgen_is_null = function (arg0) {
    const ret = getObject(arg0) === null;

    return ret;
  };

  imports.wbg.__wbg_write_6dbb849ac2bacadd = function () {
    return handleError(function (arg0, arg1, arg2) {
      const ret = getObject(arg0).write(getArrayU8FromWasm0(arg1, arg2));

      return addHeapObject(ret);
    }, arguments);
  };

  imports.wbg.__wbg_shutdown_b944ceb37fcb76e7 = function () {
    return handleError(function (arg0) {
      getObject(arg0).shutdown();
    }, arguments);
  };

  imports.wbg.__wbg_close_3f8619df73ed2cf0 = function (arg0) {
    getObject(arg0).close();
  };

  imports.wbg.__wbindgen_string_get = function (arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof (obj) === 'string' ? obj : undefined;
    const ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;

    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };

  imports.wbg.__wbg_websockettransport_df20a71d4a72a605 = function () {
    const ret = websocket_transport();

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_clearTimeout_76877dbc010e786d = function (arg0) {
    const ret = clearTimeout(takeObject(arg0));

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_setTimeout_75cb9b6991a4031d = function () {
    return handleError(function (arg0, arg1) {
      const ret = setTimeout(getObject(arg0), arg1);

      return addHeapObject(ret);
    }, arguments);
  };

  imports.wbg.__wbg_debug_7960d327fd96f71a = function (arg0, arg1, arg2, arg3) {
    console.debug(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
  };

  imports.wbg.__wbg_error_fd84ca2a8a977774 = function (arg0, arg1, arg2, arg3) {
    console.error(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
  };

  imports.wbg.__wbg_info_5566be377f5b52ae = function (arg0, arg1, arg2, arg3) {
    console.info(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
  };

  imports.wbg.__wbg_log_7b690f184ae4519b = function (arg0, arg1, arg2, arg3) {
    console.log(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
  };

  imports.wbg.__wbg_warn_48cbddced45e5414 = function (arg0, arg1, arg2, arg3) {
    console.warn(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
  };

  imports.wbg.__wbg_now_c644db5194be8437 = function (arg0) {
    const ret = getObject(arg0).now();

    return ret;
  };

  imports.wbg.__wbg_randomFillSync_6894564c2c334c42 = function () {
    return handleError(function (arg0, arg1, arg2) {
      getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
    }, arguments);
  };

  imports.wbg.__wbg_getRandomValues_805f1c3d65988a5a = function () {
    return handleError(function (arg0, arg1) {
      getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments);
  };

  imports.wbg.__wbg_crypto_e1d53a1d73fb10b8 = function (arg0) {
    const ret = getObject(arg0).crypto;

    return addHeapObject(ret);
  };

  imports.wbg.__wbindgen_is_object = function (arg0) {
    const val = getObject(arg0);
    const ret = typeof (val) === 'object' && val !== null;

    return ret;
  };

  imports.wbg.__wbg_process_038c26bf42b093f8 = function (arg0) {
    const ret = getObject(arg0).process;

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_versions_ab37218d2f0b24a8 = function (arg0) {
    const ret = getObject(arg0).versions;

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_node_080f4b19d15bc1fe = function (arg0) {
    const ret = getObject(arg0).node;

    return addHeapObject(ret);
  };

  imports.wbg.__wbindgen_is_string = function (arg0) {
    const ret = typeof (getObject(arg0)) === 'string';

    return ret;
  };

  imports.wbg.__wbg_msCrypto_6e7d3e1f92610cbb = function (arg0) {
    const ret = getObject(arg0).msCrypto;

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_require_78a3dcfbdba9cbce = function () {
    return handleError(function () {
      const ret = module.require;

      return addHeapObject(ret);
    }, arguments);
  };

  imports.wbg.__wbindgen_is_function = function (arg0) {
    const ret = typeof (getObject(arg0)) === 'function';

    return ret;
  };

  imports.wbg.__wbg_newnoargs_2b8b6bd7753c76ba = function (arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_next_88560ec06a094dea = function () {
    return handleError(function (arg0) {
      const ret = getObject(arg0).next();

      return addHeapObject(ret);
    }, arguments);
  };

  imports.wbg.__wbg_done_1ebec03bbd919843 = function (arg0) {
    const ret = getObject(arg0).done;

    return ret;
  };

  imports.wbg.__wbg_value_6ac8da5cc5b3efda = function (arg0) {
    const ret = getObject(arg0).value;

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_get_baf4855f9a986186 = function () {
    return handleError(function (arg0, arg1) {
      const ret = Reflect.get(getObject(arg0), getObject(arg1));

      return addHeapObject(ret);
    }, arguments);
  };

  imports.wbg.__wbg_call_95d1ea488d03e4e8 = function () {
    return handleError(function (arg0, arg1) {
      const ret = getObject(arg0).call(getObject(arg1));

      return addHeapObject(ret);
    }, arguments);
  };

  imports.wbg.__wbg_self_e7c1f827057f6584 = function () {
    return handleError(function () {
      const ret = self.self;

      return addHeapObject(ret);
    }, arguments);
  };

  imports.wbg.__wbg_window_a09ec664e14b1b81 = function () {
    return handleError(function () {
      const ret = window.window;

      return addHeapObject(ret);
    }, arguments);
  };

  imports.wbg.__wbg_globalThis_87cbb8506fecf3a9 = function () {
    return handleError(function () {
      const ret = globalThis.globalThis;

      return addHeapObject(ret);
    }, arguments);
  };

  imports.wbg.__wbg_global_c85a9259e621f3db = function () {
    return handleError(function () {
      const ret = global.global;

      return addHeapObject(ret);
    }, arguments);
  };

  imports.wbg.__wbindgen_is_undefined = function (arg0) {
    const ret = getObject(arg0) === undefined;

    return ret;
  };

  imports.wbg.__wbg_instanceof_Error_749a7378f4439ee0 = function (arg0) {
    let result;

    try {
      result = getObject(arg0) instanceof Error;
    } catch {
      result = false;
    }

    const ret = result;

    return ret;
  };

  imports.wbg.__wbg_message_a95c3ef248e4b57a = function (arg0) {
    const ret = getObject(arg0).message;

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_name_c69a20c4b1197dc0 = function (arg0) {
    const ret = getObject(arg0).name;

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_call_9495de66fdbe016b = function () {
    return handleError(function (arg0, arg1, arg2) {
      const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));

      return addHeapObject(ret);
    }, arguments);
  };

  imports.wbg.__wbg_instanceof_Object_f5a826c4da0d4a94 = function (arg0) {
    let result;

    try {
      result = getObject(arg0) instanceof Object;
    } catch {
      result = false;
    }

    const ret = result;

    return ret;
  };

  imports.wbg.__wbg_toString_8c529acfe543ce16 = function (arg0) {
    const ret = getObject(arg0).toString();

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_new_9d3a9ce4282a18a8 = function (arg0, arg1) {
    try {
      var state0 = { a: arg0, b: arg1 };

      const cb0 = (arg0, arg1) => {
        const a = state0.a;

        state0.a = 0;

        try {
          return __wbg_adapter_121(a, state0.b, arg0, arg1);
        } finally {
          state0.a = a;
        }
      };

      const ret = new Promise(cb0);

      return addHeapObject(ret);
    } finally {
      state0.a = state0.b = 0;
    }
  };

  imports.wbg.__wbg_resolve_fd40f858d9db1a04 = function (arg0) {
    const ret = Promise.resolve(getObject(arg0));

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_then_ec5db6d509eb475f = function (arg0, arg1) {
    const ret = getObject(arg0).then(getObject(arg1));

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_then_f753623316e2873a = function (arg0, arg1, arg2) {
    const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_buffer_cf65c07de34b9a08 = function (arg0) {
    const ret = getObject(arg0).buffer;

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_new_537b7341ce90bb31 = function (arg0) {
    const ret = new Uint8Array(getObject(arg0));

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_set_17499e8aa4003ebd = function (arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
  };

  imports.wbg.__wbg_length_27a2afe8ab42b09f = function (arg0) {
    const ret = getObject(arg0).length;

    return ret;
  };

  imports.wbg.__wbg_newwithlength_b56c882b57805732 = function (arg0) {
    const ret = new Uint8Array(arg0 >>> 0);

    return addHeapObject(ret);
  };

  imports.wbg.__wbg_subarray_7526649b91a252a6 = function (arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);

    return addHeapObject(ret);
  };

  imports.wbg.__wbindgen_debug_string = function (arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;

    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };

  imports.wbg.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };

  imports.wbg.__wbindgen_memory = function () {
    const ret = wasm.memory;

    return addHeapObject(ret);
  };

  imports.wbg.__wbindgen_closure_wrapper1806 = function (arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 693, __wbg_adapter_28);

    return addHeapObject(ret);
  };

  imports.wbg.__wbindgen_closure_wrapper1997 = function (arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 788, __wbg_adapter_31);

    return addHeapObject(ret);
  };

  return imports;
}

function initMemory (imports, maybe_memory) {

}

function finalizeInit (instance, module) {
  wasm = instance.exports;
  init.__wbindgen_wasm_module = module;
  cachedInt32Memory0 = null;
  cachedUint32Memory0 = null;
  cachedUint8Memory0 = null;

  return wasm;
}

function initSync (module) {
  const imports = getImports();

  initMemory(imports);

  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module);
  }

  const instance = new WebAssembly.Instance(module, imports);

  return finalizeInit(instance, module);
}

async function init (input) {
  if (typeof input === 'undefined') {
    input = new URL('skw_mpc_wasm_opt.wasm', import.meta.url);
  }

  const imports = getImports();

  if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
    input = fetch(input);
  }

  initMemory(imports);

  const { instance, module } = await load(await input, imports);

  return finalizeInit(instance, module);
}

export { initSync };
export default init;
