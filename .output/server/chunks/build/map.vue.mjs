import { _ as _sfc_main$1 } from './RecipeMap.vue.mjs';
import { computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useRecipesStore } from './recipes.mjs';
import './index2.mjs';
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
import 'leaflet';

const _sfc_main = {
  __name: "map",
  __ssrInlineRender: true,
  setup(__props) {
    const recipesStore = useRecipesStore();
    const recipes = computed(() => recipesStore.recipes);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RecipeMap = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"><div class="px-4 py-6 sm:px-0"><h1 class="text-3xl font-light text-gray-900 mb-6">Кулинарная карта мира</h1><div class="bg-white rounded-lg border border-gray-200 p-6 h-[600px]">`);
      _push(ssrRenderComponent(_component_RecipeMap, { recipes: unref(recipes) }, null, _parent));
      _push(`</div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/map.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=map.vue.mjs.map
