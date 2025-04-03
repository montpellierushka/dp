import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import __nuxt_component_1 from './index2.mjs';
import { ref, computed, watch, mergeProps, unref, useSSRContext, withCtx, createVNode, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useRecipesStore } from './recipes.mjs';
import { _ as _sfc_main$2 } from './RecipeCard.vue2.mjs';
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
import './server.mjs';
import 'pinia';
import 'vue-router';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';
import '@iconify/utils/lib/css/icon';
import './favorites.mjs';

const _sfc_main$1 = {
  __name: "RecipeFilters",
  __ssrInlineRender: true,
  emits: ["filter"],
  setup(__props, { emit: __emit }) {
    const recipesStore = useRecipesStore();
    const searchQuery = ref("");
    const selectedCountry = ref("");
    const selectedTag = ref("");
    const countries = computed(() => {
      const uniqueCountries = new Set(recipesStore.recipes.map((recipe) => recipe.country));
      return Array.from(uniqueCountries).sort();
    });
    const tags = computed(() => {
      const allTags = recipesStore.recipes.flatMap((recipe) => recipe.tags);
      const uniqueTags = new Set(allTags);
      return Array.from(uniqueTags).sort();
    });
    watch([searchQuery, selectedCountry, selectedTag], () => {
      emit("filter", {
        search: searchQuery.value,
        country: selectedCountry.value,
        tag: selectedTag.value
      });
    });
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-lg shadow-md p-6 mb-6" }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="relative"><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Поиск рецептов..." class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "search",
        class: "absolute left-3 top-2.5 text-gray-400 w-5 h-5"
      }, null, _parent));
      _push(`</div><div><select class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCountry)) ? ssrLooseContain(unref(selectedCountry), "") : ssrLooseEqual(unref(selectedCountry), "")) ? " selected" : ""}>Все страны</option><!--[-->`);
      ssrRenderList(unref(countries), (country) => {
        _push(`<option${ssrRenderAttr("value", country)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCountry)) ? ssrLooseContain(unref(selectedCountry), country) : ssrLooseEqual(unref(selectedCountry), country)) ? " selected" : ""}>${ssrInterpolate(country)}</option>`);
      });
      _push(`<!--]--></select></div><div><select class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedTag)) ? ssrLooseContain(unref(selectedTag), "") : ssrLooseEqual(unref(selectedTag), "")) ? " selected" : ""}>Все теги</option><!--[-->`);
      ssrRenderList(unref(tags), (tag) => {
        _push(`<option${ssrRenderAttr("value", tag)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedTag)) ? ssrLooseContain(unref(selectedTag), tag) : ssrLooseEqual(unref(selectedTag), tag)) ? " selected" : ""}>${ssrInterpolate(tag)}</option>`);
      });
      _push(`<!--]--></select></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RecipeFilters.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const recipesStore = useRecipesStore();
    const filters = ref({
      search: "",
      country: "",
      tag: ""
    });
    const handleFilter = (newFilters) => {
      filters.value = newFilters;
    };
    const filteredRecipes = computed(() => {
      return recipesStore.recipes.filter((recipe) => {
        const matchesSearch = !filters.value.search || recipe.title.toLowerCase().includes(filters.value.search.toLowerCase()) || recipe.description.toLowerCase().includes(filters.value.search.toLowerCase());
        const matchesCountry = !filters.value.country || recipe.country === filters.value.country;
        const matchesTag = !filters.value.tag || recipe.tags.includes(filters.value.tag);
        return matchesSearch && matchesCountry && matchesTag;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      const _component_RecipeFilters = _sfc_main$1;
      const _component_RecipeCard = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}><main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"><div class="px-4 py-6 sm:px-0"><div class="flex justify-between items-center mb-6"><h1 class="text-3xl font-light text-gray-900">Рецепты</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/recipes/add",
        class: "inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "plus",
              class: "w-5 h-5 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Новый рецепт `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "plus",
                class: "w-5 h-5 mr-2"
              }),
              createTextVNode(" Новый рецепт ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_RecipeFilters, { onFilter: handleFilter }, null, _parent));
      if (unref(filteredRecipes).length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(unref(filteredRecipes), (recipe) => {
          _push(ssrRenderComponent(_component_RecipeCard, {
            key: recipe.id,
            recipe
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="bg-white rounded-lg border border-gray-200 p-8 text-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "exclamation-circle",
          class: "w-12 h-12 text-gray-400 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-gray-500 text-lg">Рецепты не найдены</p><p class="text-gray-400 mt-2">Попробуйте изменить параметры поиска</p></div>`);
      }
      _push(`</div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/recipes/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.vue2.mjs.map
