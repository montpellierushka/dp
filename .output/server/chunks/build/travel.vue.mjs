import { ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './RecipeMap.vue.mjs';
import __nuxt_component_1 from './index2.mjs';
import { u as useRecipesStore } from './recipes.mjs';
import 'leaflet';
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

/* empty css               */
const _sfc_main$1 = {
  __name: "RouteMap",
  __ssrInlineRender: true,
  props: {
    route: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    ref(null);
    const showRoute = ref(true);
    const countryCoordinates = {
      "Италия": [41.9028, 12.4964],
      "Франция": [48.8566, 2.3522],
      "Испания": [40.4168, -3.7038],
      "Япония": [35.6762, 139.6503],
      "Таиланд": [13.7563, 100.5018],
      "Греция": [37.9838, 23.7275],
      "Индия": [28.6139, 77.209],
      "Мексика": [19.4326, -99.1332],
      "Китай": [39.9042, 116.4074],
      "Россия": [55.7558, 37.6173]
    };
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEEAD",
      "#D4A5A5",
      "#FFB347",
      "#47B8E0",
      "#FF9999",
      "#9B59B6"
    ];
    const getPointColor = (index) => {
      return colors[index % colors.length];
    };
    const routePoints = computed(() => {
      return props.route.countries.map((country) => ({
        name: country,
        coordinates: countryCoordinates[country]
      }));
    });
    watch(() => props.route, () => {
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full w-full relative" }, _attrs))}><div class="h-full w-full"></div><div class="absolute top-4 right-4 bg-white rounded-lg border border-gray-200 p-4 shadow-lg z-[1000]"><div class="flex items-center justify-between mb-2"><h3 class="text-sm font-medium text-gray-900">Маршрут</h3><button class="text-xs text-gray-500 hover:text-gray-700">${ssrInterpolate(showRoute.value ? "Скрыть" : "Показать")}</button></div>`);
      if (showRoute.value) {
        _push(`<div class="space-y-2"><!--[-->`);
        ssrRenderList(routePoints.value, (point, index) => {
          _push(`<div class="flex items-center"><div class="w-3 h-3 rounded-full mr-2" style="${ssrRenderStyle({ backgroundColor: getPointColor(index) })}"></div><span class="text-sm text-gray-700">${ssrInterpolate(point.name)}</span></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RouteMap.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

/* empty css             */
const _sfc_main = {
  __name: "travel",
  __ssrInlineRender: true,
  setup(__props) {
    const recipesStore = useRecipesStore();
    const recipes = computed(() => recipesStore.recipes);
    const searchQuery = ref("");
    const showAddRouteModal = ref(false);
    const selectedRoute = ref(null);
    const favoriteRoutes = ref([]);
    const newRoute = ref({
      title: "",
      description: "",
      countries: [],
      duration: 7
    });
    const availableCountries = [
      "Италия",
      "Франция",
      "Испания",
      "Япония",
      "Таиланд",
      "Греция",
      "Индия",
      "Мексика",
      "Китай",
      "Россия"
    ];
    const routes = ref([
      {
        id: 1,
        title: "Средиземноморский гастротур",
        description: "Путешествие по лучшим ресторанам Средиземноморья",
        countries: ["Италия", "Франция", "Испания", "Греция"],
        duration: 14
      },
      {
        id: 2,
        title: "Азиатский кулинарный тур",
        description: "Знакомство с кухнями Азии",
        countries: ["Япония", "Таиланд", "Китай"],
        duration: 10
      },
      {
        id: 3,
        title: "Европейский гастротур",
        description: "Путешествие по европейским столицам",
        countries: ["Франция", "Италия", "Испания"],
        duration: 7
      }
    ]);
    const filteredRoutes = computed(() => {
      if (!searchQuery.value) return routes.value;
      const query = searchQuery.value.toLowerCase();
      return routes.value.filter(
        (route) => route.title.toLowerCase().includes(query) || route.description.toLowerCase().includes(query) || route.countries.some((country) => country.toLowerCase().includes(query))
      );
    });
    const isFavorite = (routeId) => {
      return favoriteRoutes.value.some((route) => route.id === routeId);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouteMap = _sfc_main$1;
      const _component_RecipeMap = _sfc_main$2;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><div class="bg-white shadow-sm"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><h1 class="text-3xl font-bold text-gray-900">Кулинарные путешествия</h1><p class="mt-2 text-gray-600">Откройте для себя мир через его кухню</p></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2"><div class="bg-white rounded-lg shadow-sm overflow-hidden"><div class="h-[600px]">`);
      if (selectedRoute.value) {
        _push(ssrRenderComponent(_component_RouteMap, { route: selectedRoute.value }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_RecipeMap, { recipes: recipes.value }, null, _parent));
      }
      _push(`</div></div></div><div class="space-y-6"><div class="bg-white rounded-lg shadow-sm p-4"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-medium text-gray-900">Маршруты</h2><button class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"> Создать маршрут </button></div><div class="mb-4"><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Поиск маршрутов..." class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(filteredRoutes.value, (route) => {
        _push(`<div class="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"><div class="flex items-start justify-between"><div><h3 class="font-medium text-gray-900">${ssrInterpolate(route.title)}</h3><p class="text-sm text-gray-500 mt-1">${ssrInterpolate(route.countries.length)} стран</p></div><div class="flex items-center space-x-2"><span class="text-sm text-gray-500">${ssrInterpolate(route.duration)} дней</span><button class="text-gray-400 hover:text-red-500 transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: isFavorite(route.id) ? "heart" : "heart-outline",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div></div><div class="mt-2 flex flex-wrap gap-1"><!--[-->`);
        ssrRenderList(route.countries, (country) => {
          _push(`<span class="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">${ssrInterpolate(country)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white rounded-lg shadow-sm p-4"><h2 class="text-lg font-medium text-gray-900 mb-4">Избранные маршруты</h2><div class="space-y-4"><!--[-->`);
      ssrRenderList(favoriteRoutes.value, (route) => {
        _push(`<div class="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"><div class="flex items-start justify-between"><div><h3 class="font-medium text-gray-900">${ssrInterpolate(route.title)}</h3><p class="text-sm text-gray-500 mt-1">${ssrInterpolate(route.countries.length)} стран</p></div><span class="text-sm text-gray-500">${ssrInterpolate(route.duration)} дней</span></div><div class="mt-2 flex flex-wrap gap-1"><!--[-->`);
        ssrRenderList(route.countries, (country) => {
          _push(`<span class="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">${ssrInterpolate(country)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div>`);
      if (showAddRouteModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]"><div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4"><div class="p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-medium text-gray-900">Создание маршрута</h2><button class="text-gray-400 hover:text-gray-500">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "close",
          class: "w-6 h-6"
        }, null, _parent));
        _push(`</button></div><form class="space-y-4"><div><label class="block text-sm font-medium text-gray-700">Название маршрута</label><input${ssrRenderAttr("value", newRoute.value.title)} type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"></div><div><label class="block text-sm font-medium text-gray-700">Описание</label><textarea rows="3" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200">${ssrInterpolate(newRoute.value.description)}</textarea></div><div><label class="block text-sm font-medium text-gray-700">Страны</label><div class="mt-1 flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(availableCountries, (country) => {
          _push(`<div class="flex items-center"><input${ssrRenderAttr("id", country)}${ssrIncludeBooleanAttr(Array.isArray(newRoute.value.countries) ? ssrLooseContain(newRoute.value.countries, country) : newRoute.value.countries) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", country)} class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"><label${ssrRenderAttr("for", country)} class="ml-2 text-sm text-gray-700">${ssrInterpolate(country)}</label></div>`);
        });
        _push(`<!--]--></div></div><div><label class="block text-sm font-medium text-gray-700">Продолжительность (дни)</label><input${ssrRenderAttr("value", newRoute.value.duration)} type="number" min="1" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"></div><div class="flex justify-end space-x-3"><button type="button" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"> Отмена </button><button type="submit" class="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700"> Создать </button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/travel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=travel.vue.mjs.map
