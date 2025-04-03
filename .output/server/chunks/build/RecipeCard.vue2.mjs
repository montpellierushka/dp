import __nuxt_component_1 from './index2.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useRecipesStore } from './recipes.mjs';
import { u as useFavoritesStore } from './favorites.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RecipeCard",
  __ssrInlineRender: true,
  props: {
    recipe: {}
  },
  setup(__props) {
    const props = __props;
    useRecipesStore();
    const favoritesStore = useFavoritesStore();
    const isFavorite = computed(() => {
      var _a;
      return ((_a = favoritesStore.favorites) == null ? void 0 : _a.includes(props.recipe.id)) || false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors overflow-hidden" }, _attrs))}><div class="relative h-48">`);
      if (_ctx.recipe.imageUrl) {
        _push(`<img${ssrRenderAttr("src", _ctx.recipe.imageUrl)}${ssrRenderAttr("alt", _ctx.recipe.title)} class="w-full h-full object-cover">`);
      } else {
        _push(`<div class="w-full h-full bg-gray-50 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "photo",
          class: "w-12 h-12 text-gray-300"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`<button class="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(isFavorite) ? "heart-solid" : "heart",
        class: ["w-5 h-5", unref(isFavorite) ? "text-red-500" : "text-gray-400"]
      }, null, _parent));
      _push(`</button></div><div class="p-6"><h3 class="text-lg font-light text-gray-900 mb-2">${ssrInterpolate(_ctx.recipe.title)}</h3><p class="text-gray-600 text-sm mb-4 line-clamp-2">${ssrInterpolate(_ctx.recipe.description)}</p><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-4"><div class="flex items-center text-gray-500 text-sm">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "map-marker",
        class: "w-4 h-4 mr-1"
      }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.recipe.country)}</div><div class="flex items-center text-gray-500 text-sm">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "clock",
        class: "w-4 h-4 mr-1"
      }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.recipe.cookingTime)} мин </div></div><div class="flex items-center text-gray-500 text-sm">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "star",
        class: "w-4 h-4 mr-1"
      }, null, _parent));
      _push(` ${ssrInterpolate(((_a = _ctx.recipe.rating) == null ? void 0 : _a.toFixed(1)) || "Нет оценок")}</div></div><div class="flex flex-wrap gap-2 mb-4"><!--[-->`);
      ssrRenderList(_ctx.recipe.tags.slice(0, 3), (tag) => {
        _push(`<span class="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">${ssrInterpolate(tag)}</span>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/recipes/${_ctx.recipe.id}`,
        class: "inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Подробнее `);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "arrow-right",
              class: "w-4 h-4 ml-2"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Подробнее "),
              createVNode(_component_Icon, {
                name: "arrow-right",
                class: "w-4 h-4 ml-2"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=RecipeCard.vue2.mjs.map
