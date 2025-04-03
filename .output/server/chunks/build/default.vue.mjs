import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'pinia';
import 'vue-router';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><header class="bg-white border-b border-gray-200"><div class="container mx-auto px-4 py-6"><div class="flex items-center justify-between">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: "text-2xl font-light text-gray-800 tracking-tight"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` CulinaryPassport `);
      } else {
        return [
          createTextVNode(" CulinaryPassport ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<nav class="flex items-center space-x-8">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: "text-gray-600 hover:text-gray-900 transition-colors text-sm",
    "active-class": "text-gray-900 font-medium"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Главная `);
      } else {
        return [
          createTextVNode(" Главная ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/recipes",
    class: "text-gray-600 hover:text-gray-900 transition-colors text-sm",
    "active-class": "text-gray-900 font-medium"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Рецепты `);
      } else {
        return [
          createTextVNode(" Рецепты ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/favorites",
    class: "text-gray-600 hover:text-gray-900 transition-colors text-sm",
    "active-class": "text-gray-900 font-medium"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Избранное `);
      } else {
        return [
          createTextVNode(" Избранное ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/recipes/add",
    class: "text-gray-600 hover:text-gray-900 transition-colors text-sm",
    "active-class": "text-gray-900 font-medium"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Добавить рецепт `);
      } else {
        return [
          createTextVNode(" Добавить рецепт ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</nav></div></div></header><main class="container mx-auto px-4 py-12">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main><footer class="bg-white border-t border-gray-200 mt-12"><div class="container mx-auto px-4 py-8"><div class="text-center text-gray-500 text-sm"> © 2024 CulinaryPassport. Все права защищены. </div></div></footer></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default.vue.mjs.map
