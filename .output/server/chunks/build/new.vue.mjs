import { _ as _sfc_main$1 } from './Navbar.vue.mjs';
import __nuxt_component_1 from './index2.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useRecipesStore } from './recipes.mjs';
import { useRouter } from 'vue-router';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';

const _sfc_main = {
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    useRecipesStore();
    useRouter();
    const form = ref({
      title: "",
      description: "",
      country: "",
      cookingTime: 30,
      ingredients: [""],
      steps: [""],
      tags: []
    });
    const newTag = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Navbar = _sfc_main$1;
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
      _push(`<main class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8"><div class="px-4 py-6 sm:px-0"><div class="bg-white rounded-lg shadow-md p-6"><h1 class="text-3xl font-bold text-gray-900 mb-6">Добавить новый рецепт</h1><form class="space-y-6"><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Название рецепта</label><input${ssrRenderAttr("value", unref(form).title)} type="text" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Страна</label><input${ssrRenderAttr("value", unref(form).country)} type="text" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Время приготовления (минуты)</label><input${ssrRenderAttr("value", unref(form).cookingTime)} type="number" required min="1" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Описание</label><textarea required rows="3" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">${ssrInterpolate(unref(form).description)}</textarea></div></div><div><div class="flex justify-between items-center mb-2"><label class="block text-sm font-medium text-gray-700">Ингредиенты</label><button type="button" class="text-blue-600 hover:text-blue-800 text-sm font-medium"> + Добавить ингредиент </button></div><div class="space-y-2"><!--[-->`);
      ssrRenderList(unref(form).ingredients, (ingredient, index) => {
        _push(`<div class="flex items-center gap-2"><input${ssrRenderAttr("value", unref(form).ingredients[index])} type="text" required class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"><button type="button" class="text-red-600 hover:text-red-800">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "trash",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--></div></div><div><div class="flex justify-between items-center mb-2"><label class="block text-sm font-medium text-gray-700">Шаги приготовления</label><button type="button" class="text-blue-600 hover:text-blue-800 text-sm font-medium"> + Добавить шаг </button></div><div class="space-y-2"><!--[-->`);
      ssrRenderList(unref(form).steps, (step, index) => {
        _push(`<div class="flex items-start gap-2"><span class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mt-2">${ssrInterpolate(index + 1)}</span><textarea required rows="2" class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">${ssrInterpolate(unref(form).steps[index])}</textarea><button type="button" class="text-red-600 hover:text-red-800 mt-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "trash",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Теги</label><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(unref(form).tags, (tag, index) => {
        _push(`<div class="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"><span>${ssrInterpolate(tag)}</span><button type="button" class="text-gray-500 hover:text-gray-700">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "x",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--><input${ssrRenderAttr("value", unref(newTag))} type="text" placeholder="Добавить тег" class="px-3 py-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"></div></div><div class="flex justify-end gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/recipes",
        class: "px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Отмена `);
          } else {
            return [
              createTextVNode(" Отмена ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"> Сохранить рецепт </button></div></form></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/recipes/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new.vue.mjs.map
