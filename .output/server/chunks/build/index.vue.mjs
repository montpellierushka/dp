import __nuxt_component_1 from './index2.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import '@iconify/utils/lib/css/icon';
import '@iconify/vue';
import './server.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="mb-16"><div class="max-w-4xl mx-auto text-center"><h1 class="text-4xl font-light text-gray-900 mb-6">Добро пожаловать в CulinaryPassport</h1><p class="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"> Ваш гид по кулинарным путешествиям по всему миру. Откройте для себя новые вкусы и традиции разных стран. </p></div></section><section><div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"><div class="bg-white rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-colors"><div class="mb-6">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "book-open",
        class: "w-8 h-8 text-gray-400"
      }, null, _parent));
      _push(`</div><h3 class="text-xl font-light text-gray-900 mb-3">Рецепты</h3><p class="text-gray-600 mb-6">Изучите традиционные рецепты со всего мира</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/recipes",
        class: "inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Перейти к рецептам `);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "arrow-right",
              class: "w-4 h-4 ml-2"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Перейти к рецептам "),
              createVNode(_component_Icon, {
                name: "arrow-right",
                class: "w-4 h-4 ml-2"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-white rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-colors"><div class="mb-6">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "map",
        class: "w-8 h-8 text-gray-400"
      }, null, _parent));
      _push(`</div><h3 class="text-xl font-light text-gray-900 mb-3">Карта</h3><p class="text-gray-600 mb-6">Откройте кулинарные маршруты на интерактивной карте</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/map",
        class: "inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Исследовать карту `);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "arrow-right",
              class: "w-4 h-4 ml-2"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Исследовать карту "),
              createVNode(_component_Icon, {
                name: "arrow-right",
                class: "w-4 h-4 ml-2"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-white rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-colors"><div class="mb-6">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "globe",
        class: "w-8 h-8 text-gray-400"
      }, null, _parent));
      _push(`</div><h3 class="text-xl font-light text-gray-900 mb-3">Путешествия</h3><p class="text-gray-600 mb-6">Планируйте свои гастрономические приключения</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/travel",
        class: "inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Начать планирование `);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "arrow-right",
              class: "w-4 h-4 ml-2"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Начать планирование "),
              createVNode(_component_Icon, {
                name: "arrow-right",
                class: "w-4 h-4 ml-2"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.vue.mjs.map
