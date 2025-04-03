import __nuxt_component_1 from './index2.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { defineComponent, mergeProps, ref, computed, unref, useSSRContext, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { u as useRecipesStore } from './recipes.mjs';
import { u as useFavoritesStore } from './favorites.mjs';
import { b as useRoute } from './server.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RecipeRating",
  __ssrInlineRender: true,
  props: {
    rating: {},
    count: { default: 0 },
    showCount: { type: Boolean, default: false },
    interactive: { type: Boolean, default: false }
  },
  emits: ["update:rating"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center" }, _attrs))}><div class="flex"><!--[-->`);
      ssrRenderList(5, (star) => {
        _push(`<button class="focus:outline-none"${ssrIncludeBooleanAttr(!_ctx.interactive) ? " disabled" : ""}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: star <= _ctx.rating ? "star-solid" : "star",
          class: ["w-5 h-5", [
            star <= _ctx.rating ? "text-yellow-400" : "text-gray-300",
            _ctx.interactive ? "hover:text-yellow-400" : ""
          ]]
        }, null, _parent));
        _push(`</button>`);
      });
      _push(`<!--]--></div>`);
      if (_ctx.showCount) {
        _push(`<span class="ml-2 text-sm text-gray-500"> (${ssrInterpolate(_ctx.count)}) </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_main$1 = {
  __name: "RecipeReviews",
  __ssrInlineRender: true,
  props: {
    recipeId: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const recipesStore = useRecipesStore();
    const editingReview = ref(null);
    const form = ref({
      author: "",
      rating: 0,
      comment: ""
    });
    const reviews = computed(() => {
      const recipe = recipesStore.getRecipeById(props.recipeId);
      return (recipe == null ? void 0 : recipe.reviews) || [];
    });
    const sortedReviews = computed(() => {
      return [...reviews.value].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
    const averageRating = computed(() => {
      if (!reviews.value.length) return 0;
      const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0);
      return sum / reviews.value.length;
    });
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RecipeRating = _sfc_main$2;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-8" }, _attrs))}><h2 class="text-xl font-semibold mb-4">Отзывы</h2><div class="flex items-center mb-6">`);
      _push(ssrRenderComponent(_component_RecipeRating, {
        rating: unref(averageRating),
        count: unref(reviews).length,
        "show-count": true,
        interactive: false
      }, null, _parent));
      _push(`</div><div class="bg-gray-50 rounded-lg p-6 mb-8"><h3 class="text-lg font-medium mb-4">${ssrInterpolate(unref(editingReview) ? "Редактировать отзыв" : "Оставить отзыв")}</h3><form class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label><input${ssrRenderAttr("value", unref(form).author)} type="text" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Оценка</label>`);
      _push(ssrRenderComponent(_component_RecipeRating, {
        rating: unref(form).rating,
        "onUpdate:rating": ($event) => unref(form).rating = $event,
        interactive: true,
        "show-count": false
      }, null, _parent));
      _push(`</div><div><label class="block text-sm font-medium text-gray-700 mb-1">Комментарий</label><textarea required rows="3" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">${ssrInterpolate(unref(form).comment)}</textarea></div><div class="flex gap-4"><button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">${ssrInterpolate(unref(editingReview) ? "Сохранить изменения" : "Отправить отзыв")}</button>`);
      if (unref(editingReview)) {
        _push(`<button type="button" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"> Отмена </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></div>`);
      if (unref(reviews).length > 0) {
        _push(`<div class="space-y-6"><!--[-->`);
        ssrRenderList(unref(sortedReviews), (review) => {
          _push(`<div class="bg-white rounded-lg shadow-sm p-6"><div class="flex justify-between items-start mb-2"><div><h4 class="font-medium text-gray-900">${ssrInterpolate(review.author)}</h4><div class="flex items-center text-sm text-gray-500">`);
          _push(ssrRenderComponent(_component_RecipeRating, {
            rating: review.rating,
            "show-count": false,
            interactive: false
          }, null, _parent));
          _push(`<span class="ml-2">${ssrInterpolate(formatDate(review.date))}</span></div></div><div class="flex items-center gap-2"><button class="${ssrRenderClass([{ "text-red-500": review.isLiked }, "flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors duration-200"])}">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: review.isLiked ? "heart-solid" : "heart",
            class: "w-5 h-5"
          }, null, _parent));
          _push(`<span class="text-sm">${ssrInterpolate(review.likes)}</span></button>`);
          {
            _push(`<button class="text-gray-400 hover:text-blue-500 transition-colors duration-200">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "pencil",
              class: "w-5 h-5"
            }, null, _parent));
            _push(`</button>`);
          }
          {
            _push(`<button class="text-gray-400 hover:text-red-500 transition-colors duration-200">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "trash",
              class: "w-5 h-5"
            }, null, _parent));
            _push(`</button>`);
          }
          _push(`</div></div><p class="text-gray-600">${ssrInterpolate(review.comment)}</p></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="bg-white rounded-lg shadow-sm p-6 text-center"><p class="text-gray-500">Пока нет отзывов. Будьте первым, кто оставит отзыв!</p></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RecipeReviews.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const recipesStore = useRecipesStore();
    const favoritesStore = useFavoritesStore();
    const recipe = computed(() => {
      return recipesStore.getRecipeById(Number(route.params.id));
    });
    const isFavorite = computed(() => {
      var _a;
      return ((_a = favoritesStore.favorites) == null ? void 0 : _a.includes(Number(route.params.id))) || false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_RecipeReviews = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-8" }, _attrs))}>`);
      if (unref(recipe)) {
        _push(`<div class="max-w-4xl mx-auto"><div class="mb-8"><div class="relative h-96 rounded-lg overflow-hidden">`);
        if (unref(recipe).imageUrl) {
          _push(`<img${ssrRenderAttr("src", unref(recipe).imageUrl)}${ssrRenderAttr("alt", unref(recipe).title)} class="w-full h-full object-cover">`);
        } else {
          _push(`<div class="w-full h-full bg-gray-200 flex items-center justify-center"><span class="text-gray-400 text-lg">Нет изображения</span></div>`);
        }
        _push(`<div class="absolute top-4 right-4 flex space-x-4"><button class="p-3 rounded-full bg-white/80 hover:bg-white transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: unref(isFavorite) ? "heart-solid" : "heart",
          class: ["w-6 h-6", unref(isFavorite) ? "text-red-500" : "text-gray-500"]
        }, null, _parent));
        _push(`</button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/recipes/${unref(recipe).id}/edit`,
          class: "p-3 rounded-full bg-white/80 hover:bg-white transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "pencil",
                class: "w-6 h-6 text-gray-500"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "pencil",
                  class: "w-6 h-6 text-gray-500"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div class="md:col-span-2"><h1 class="text-3xl font-bold mb-4">${ssrInterpolate(unref(recipe).title)}</h1><p class="text-gray-600 mb-6">${ssrInterpolate(unref(recipe).description)}</p><div class="mb-8"><h2 class="text-xl font-semibold mb-4">Ингредиенты</h2><ul class="space-y-2"><!--[-->`);
        ssrRenderList(unref(recipe).ingredients, (ingredient, index) => {
          _push(`<li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> ${ssrInterpolate(ingredient)}</li>`);
        });
        _push(`<!--]--></ul></div><div class="mb-8"><h2 class="text-xl font-semibold mb-4">Шаги приготовления</h2><ol class="space-y-4"><!--[-->`);
        ssrRenderList(unref(recipe).steps, (step, index) => {
          _push(`<li class="flex"><span class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">${ssrInterpolate(index + 1)}</span><span>${ssrInterpolate(step)}</span></li>`);
        });
        _push(`<!--]--></ol></div></div><div class="md:col-span-1"><div class="bg-gray-50 rounded-lg p-6"><div class="space-y-4"><div class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "map-marker",
          class: "w-5 h-5 text-gray-500 mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-600">${ssrInterpolate(unref(recipe).country)}</span></div><div class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "clock",
          class: "w-5 h-5 text-gray-500 mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-600">${ssrInterpolate(unref(recipe).cookingTime)} минут</span></div><div class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "star",
          class: "w-5 h-5 text-yellow-400 mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-600">${ssrInterpolate(((_a = unref(recipe).rating) == null ? void 0 : _a.toFixed(1)) || "Нет оценок")}</span></div></div><div class="mt-6"><h3 class="text-lg font-semibold mb-3">Теги</h3><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(unref(recipe).tags, (tag) => {
          _push(`<span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></div></div></div></div><div class="mt-12">`);
        _push(ssrRenderComponent(_component_RecipeReviews, {
          "recipe-id": unref(recipe).id
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="text-center py-12"><p class="text-gray-500">Рецепт не найден</p></div>`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/recipes/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_.vue.mjs.map
