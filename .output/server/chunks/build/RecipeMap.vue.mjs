import __nuxt_component_1 from './index2.mjs';
import { ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import L from 'leaflet';

/* empty css                */
const _sfc_main = {
  __name: "RecipeMap",
  __ssrInlineRender: true,
  props: {
    recipes: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    ref(null);
    const selectedCountry = ref("");
    const searchQuery = ref("");
    const selectedMapStyle = ref(localStorage.getItem("mapStyle") || "default");
    const cookingTime = ref({ min: null, max: null });
    const selectedTags = ref([]);
    const isMeasuring = ref(false);
    const isLoading = ref(false);
    const expandedFilters = ref({
      country: false,
      tags: false,
      time: false,
      style: false
    });
    let markers = [];
    let markerCluster = null;
    const countryColors = {
      "Италия": "#FF6B6B",
      "Япония": "#4ECDC4",
      "Франция": "#45B7D1",
      "Таиланд": "#96CEB4",
      "Испания": "#FFEEAD",
      "Греция": "#D4A5A5",
      "Индия": "#FFB347",
      "Мексика": "#47B8E0",
      "Китай": "#FF9999",
      "Россия": "#9B59B6"
    };
    const countryCoordinates = {
      "Италия": [41.9028, 12.4964],
      "Япония": [35.6762, 139.6503],
      "Франция": [48.8566, 2.3522],
      "Таиланд": [13.7563, 100.5018],
      "Испания": [40.4168, -3.7038],
      "Греция": [37.9838, 23.7275],
      "Индия": [28.6139, 77.209],
      "Мексика": [19.4326, -99.1332],
      "Китай": [39.9042, 116.4074],
      "Россия": [55.7558, 37.6173]
    };
    const uniqueCountries = computed(() => {
      return [...new Set(props.recipes.map((recipe) => recipe.country))].sort();
    });
    const uniqueTags = computed(() => {
      const tags = /* @__PURE__ */ new Set();
      props.recipes.forEach((recipe) => {
        recipe.tags.forEach((tag) => tags.add(tag));
      });
      return Array.from(tags).sort();
    });
    const recipesByCountry = computed(() => {
      const counts = {};
      props.recipes.forEach((recipe) => {
        counts[recipe.country] = (counts[recipe.country] || 0) + 1;
      });
      return counts;
    });
    const getCountryColor = (country) => {
      return countryColors[country] || "#666666";
    };
    const filterByCookingTime = (recipes) => {
      if (!cookingTime.value.min && !cookingTime.value.max) return recipes;
      return recipes.filter((recipe) => {
        const time = parseInt(recipe.cookingTime);
        if (cookingTime.value.min && time < cookingTime.value.min) return false;
        if (cookingTime.value.max && time > cookingTime.value.max) return false;
        return true;
      });
    };
    const filterByTags = (recipes) => {
      if (selectedTags.value.length === 0) return recipes;
      return recipes.filter(
        (recipe) => selectedTags.value.every((tag) => recipe.tags.includes(tag))
      );
    };
    const updateMarkers = (filteredRecipes = null) => {
      markerCluster.clearLayers();
      markers = [];
      let recipesToShow = filteredRecipes || props.recipes;
      if (selectedCountry.value) {
        recipesToShow = recipesToShow.filter((recipe) => recipe.country === selectedCountry.value);
      }
      recipesToShow = filterByCookingTime(recipesToShow);
      recipesToShow = filterByTags(recipesToShow);
      recipesToShow.forEach((recipe) => {
        const coordinates = countryCoordinates[recipe.country];
        if (coordinates) {
          const customIcon = L.divIcon({
            className: "custom-marker",
            html: `
          <div class="relative group">
            <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg transform transition-all duration-300 group-hover:scale-110"
                 style="background-color: ${getCountryColor(recipe.country)}">
              <img 
                src="${recipe.imageUrl || "/placeholder.jpg"}" 
                alt="${recipe.title}"
                class="w-full h-full object-cover"
              >
            </div>
            <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                 style="background-color: ${getCountryColor(recipe.country)}">
            </div>
          </div>
        `,
            iconSize: [48, 48],
            iconAnchor: [24, 24]
          });
          const marker = L.marker(coordinates, { icon: customIcon }).bindPopup(`
          <div class="w-64">
            <div class="relative h-32 mb-2">
              <img 
                src="${recipe.imageUrl || "/placeholder.jpg"}" 
                alt="${recipe.title}"
                class="w-full h-full object-cover rounded-t-lg"
              >
            </div>
            <div class="p-3">
              <h3 class="font-medium text-gray-900 mb-1">${recipe.title}</h3>
              <p class="text-sm text-gray-600 mb-2 line-clamp-2">${recipe.description}</p>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center text-sm text-gray-500">
                  <Icon name="clock" class="w-4 h-4 mr-1" />
                  ${recipe.cookingTime} мин
                </div>
                <div class="flex items-center text-sm text-gray-500">
                  <Icon name="map-marker" class="w-4 h-4 mr-1" />
                  ${recipe.country}
                </div>
              </div>
              <div class="flex flex-wrap gap-1 mb-2">
                ${recipe.tags.map((tag) => `
                  <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    ${tag}
                  </span>
                `).join("")}
              </div>
              <a 
                href="/recipes/${recipe.id}" 
                class="block w-full text-center py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Подробнее
              </a>
            </div>
          </div>
        `, {
            maxWidth: 300,
            className: "custom-popup"
          });
          marker.on("mouseover", function() {
            this.openPopup();
          });
          marker.on("mouseout", function() {
            this.closePopup();
          });
          markers.push(marker);
          markerCluster.addLayer(marker);
        }
      });
    };
    watch(() => props.recipes, () => {
      updateMarkers();
    });
    watch(cookingTime, () => {
      updateMarkers();
    }, { deep: true });
    watch(selectedTags, () => {
      updateMarkers();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full w-full relative" }, _attrs))}><div class="h-full w-full"></div><div class="absolute top-4 right-4 flex flex-col gap-4"><div class="bg-white rounded-lg border border-gray-200 p-4 shadow-lg z-[1000]"><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Поиск рецептов..." class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"></div><div class="bg-white rounded-lg border border-gray-200 p-4 shadow-lg z-[1000] w-64"><div class="flex items-center justify-between mb-2"><h3 class="text-sm font-medium text-gray-900">Фильтры</h3><button class="text-xs text-gray-500 hover:text-gray-700"> Сбросить </button></div><div class="space-y-2"><div class="border-b border-gray-100 pb-2"><button class="w-full flex items-center justify-between text-sm text-gray-700"><span>Страна</span>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: expandedFilters.value.country ? "chevron-up" : "chevron-down",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button>`);
      if (expandedFilters.value.country) {
        _push(`<div class="mt-2"><select class="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedCountry.value) ? ssrLooseContain(selectedCountry.value, "") : ssrLooseEqual(selectedCountry.value, "")) ? " selected" : ""}>Все страны</option><!--[-->`);
        ssrRenderList(uniqueCountries.value, (country) => {
          _push(`<option${ssrRenderAttr("value", country)}${ssrIncludeBooleanAttr(Array.isArray(selectedCountry.value) ? ssrLooseContain(selectedCountry.value, country) : ssrLooseEqual(selectedCountry.value, country)) ? " selected" : ""}>${ssrInterpolate(country)}</option>`);
        });
        _push(`<!--]--></select></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="border-b border-gray-100 pb-2"><button class="w-full flex items-center justify-between text-sm text-gray-700"><span>Теги</span>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: expandedFilters.value.tags ? "chevron-up" : "chevron-down",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button>`);
      if (expandedFilters.value.tags) {
        _push(`<div class="mt-2"><select multiple class="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 h-24"><!--[-->`);
        ssrRenderList(uniqueTags.value, (tag) => {
          _push(`<option${ssrRenderAttr("value", tag)}${ssrIncludeBooleanAttr(Array.isArray(selectedTags.value) ? ssrLooseContain(selectedTags.value, tag) : ssrLooseEqual(selectedTags.value, tag)) ? " selected" : ""}>${ssrInterpolate(tag)}</option>`);
        });
        _push(`<!--]--></select><div class="mt-1 flex flex-wrap gap-1"><!--[-->`);
        ssrRenderList(selectedTags.value, (tag) => {
          _push(`<span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center">${ssrInterpolate(tag)} <button class="ml-1 text-gray-400 hover:text-gray-600"> × </button></span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="border-b border-gray-100 pb-2"><button class="w-full flex items-center justify-between text-sm text-gray-700"><span>Время приготовления</span>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: expandedFilters.value.time ? "chevron-up" : "chevron-down",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button>`);
      if (expandedFilters.value.time) {
        _push(`<div class="mt-2"><div class="flex items-center gap-2"><input${ssrRenderAttr("value", cookingTime.value.min)} type="number" min="0" class="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm" placeholder="От"><span class="text-gray-500">-</span><input${ssrRenderAttr("value", cookingTime.value.max)} type="number" min="0" class="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm" placeholder="До"><span class="text-gray-500 text-sm">мин</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><button class="w-full flex items-center justify-between text-sm text-gray-700"><span>Стиль карты</span>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: expandedFilters.value.style ? "chevron-up" : "chevron-down",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button>`);
      if (expandedFilters.value.style) {
        _push(`<div class="mt-2"><select class="w-full px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"><option value="default"${ssrIncludeBooleanAttr(Array.isArray(selectedMapStyle.value) ? ssrLooseContain(selectedMapStyle.value, "default") : ssrLooseEqual(selectedMapStyle.value, "default")) ? " selected" : ""}>Стандартная карта</option><option value="satellite"${ssrIncludeBooleanAttr(Array.isArray(selectedMapStyle.value) ? ssrLooseContain(selectedMapStyle.value, "satellite") : ssrLooseEqual(selectedMapStyle.value, "satellite")) ? " selected" : ""}>Спутник</option><option value="dark"${ssrIncludeBooleanAttr(Array.isArray(selectedMapStyle.value) ? ssrLooseContain(selectedMapStyle.value, "dark") : ssrLooseEqual(selectedMapStyle.value, "dark")) ? " selected" : ""}>Темная тема</option></select></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><button class="${ssrRenderClass([{ "bg-gray-800 text-white": isMeasuring.value }, "w-full mt-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"])}">${ssrInterpolate(isMeasuring.value ? "Отменить измерение" : "Измерить расстояние")}</button></div></div><div class="absolute bottom-4 left-4 bg-white rounded-lg border border-gray-200 p-4 shadow-lg z-[1000] max-h-[50vh] overflow-y-auto"><h3 class="text-sm font-medium text-gray-900 mb-2">Рецепты по странам</h3><div class="space-y-2"><!--[-->`);
      ssrRenderList(recipesByCountry.value, (count, country) => {
        _push(`<div class="flex items-center justify-between text-sm"><div class="flex items-center"><div class="w-3 h-3 rounded-full mr-2" style="${ssrRenderStyle({ backgroundColor: getCountryColor(country) })}"></div><span>${ssrInterpolate(country)}</span></div><span class="text-gray-500">${ssrInterpolate(count)}</span></div>`);
      });
      _push(`<!--]--></div></div>`);
      if (isLoading.value) {
        _push(`<div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]"><div class="bg-white p-4 rounded-lg shadow-lg"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div><p class="mt-2 text-sm text-gray-700">Загрузка карты...</p></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RecipeMap.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=RecipeMap.vue.mjs.map
