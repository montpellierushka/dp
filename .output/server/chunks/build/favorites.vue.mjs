import __nuxt_component_1 from './index2.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { computed, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { u as useRecipesStore } from './recipes.mjs';
import { u as useFavoritesStore } from './favorites.mjs';
import { _ as _sfc_main$1 } from './RecipeCard.vue2.mjs';
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
  __name: "favorites",
  __ssrInlineRender: true,
  setup(__props) {
    const recipesStore = useRecipesStore();
    const favoritesStore = useFavoritesStore();
    const favoriteRecipes = computed(() => {
      return recipesStore.recipes.filter(
        (recipe) => favoritesStore.favoriteRecipes.includes(recipe.id)
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RecipeCard = _sfc_main$1;
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"><div class="px-4 py-6 sm:px-0"><h1 class="text-3xl font-light text-gray-900 mb-6">Избранные рецепты</h1>`);
      if (unref(favoriteRecipes).length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(unref(favoriteRecipes), (recipe) => {
          _push(ssrRenderComponent(_component_RecipeCard, {
            key: recipe.id,
            recipe
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="bg-white rounded-lg border border-gray-200 p-8 text-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "star",
          class: "w-12 h-12 text-gray-400 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-gray-500 text-lg">У вас пока нет избранных рецептов</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/recipes",
          class: "inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mt-4"
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
        _push(`</div>`);
      }
      _push(`</div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/favorites.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=favorites.vue.mjs.map
