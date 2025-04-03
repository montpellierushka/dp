import __nuxt_component_1 from './index2.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useRecipesStore } from './recipes.mjs';
import { a as useRouter } from './server.mjs';
import { _ as _sfc_main$1 } from './RecipeImageUpload.vue2.mjs';
import '@iconify/utils/lib/css/icon';
import '@iconify/vue';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "add",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRecipesStore();
    const form = ref({
      title: "",
      description: "",
      country: "",
      cookingTime: 30,
      ingredients: [""],
      steps: [""],
      tags: [""],
      imageUrl: ""
    });
    const handleImageUploaded = (imageUrl) => {
      form.value.imageUrl = imageUrl;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RecipeImageUpload = _sfc_main$1;
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-8" }, _attrs))}><div class="max-w-2xl mx-auto"><h1 class="text-3xl font-bold mb-8">Добавить новый рецепт</h1><form class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">Изображение</label>`);
      _push(ssrRenderComponent(_component_RecipeImageUpload, { onImageUploaded: handleImageUploaded }, null, _parent));
      _push(`</div><div><label for="title" class="block text-sm font-medium text-gray-700 mb-2">Название</label><input id="title"${ssrRenderAttr("value", unref(form).title)} type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></div><div><label for="description" class="block text-sm font-medium text-gray-700 mb-2">Описание</label><textarea id="description" rows="3" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">${ssrInterpolate(unref(form).description)}</textarea></div><div><label for="country" class="block text-sm font-medium text-gray-700 mb-2">Страна</label><input id="country"${ssrRenderAttr("value", unref(form).country)} type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></div><div><label for="cookingTime" class="block text-sm font-medium text-gray-700 mb-2">Время приготовления (минуты)</label><input id="cookingTime"${ssrRenderAttr("value", unref(form).cookingTime)} type="number" min="1" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></div><div><label for="ingredients" class="block text-sm font-medium text-gray-700 mb-2">Ингредиенты</label><div class="space-y-2"><!--[-->`);
      ssrRenderList(unref(form).ingredients, (ingredient, index) => {
        _push(`<div class="flex items-center space-x-2"><input${ssrRenderAttr("value", unref(form).ingredients[index])} type="text" required class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"><button type="button" class="p-2 text-red-500 hover:text-red-600">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "trash",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--><button type="button" class="text-blue-500 hover:text-blue-600 text-sm font-medium"> + Добавить ингредиент </button></div></div><div><label for="steps" class="block text-sm font-medium text-gray-700 mb-2">Шаги приготовления</label><div class="space-y-2"><!--[-->`);
      ssrRenderList(unref(form).steps, (step, index) => {
        _push(`<div class="flex items-start space-x-2"><span class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mt-2">${ssrInterpolate(index + 1)}</span><textarea rows="2" required class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">${ssrInterpolate(unref(form).steps[index])}</textarea><button type="button" class="p-2 text-red-500 hover:text-red-600 mt-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "trash",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--><button type="button" class="text-blue-500 hover:text-blue-600 text-sm font-medium"> + Добавить шаг </button></div></div><div><label for="tags" class="block text-sm font-medium text-gray-700 mb-2">Теги</label><div class="space-y-2"><!--[-->`);
      ssrRenderList(unref(form).tags, (tag, index) => {
        _push(`<div class="flex items-center space-x-2"><input${ssrRenderAttr("value", unref(form).tags[index])} type="text" required class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"><button type="button" class="p-2 text-red-500 hover:text-red-600">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "trash",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--><button type="button" class="text-blue-500 hover:text-blue-600 text-sm font-medium"> + Добавить тег </button></div></div><div class="flex justify-end space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/recipes",
        class: "px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
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
      _push(`<button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"> Сохранить рецепт </button></div></form></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/recipes/add.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=add.vue.mjs.map
