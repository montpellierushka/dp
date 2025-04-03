import __nuxt_component_1 from './index2.mjs';
import { defineComponent, ref, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RecipeImageUpload",
  __ssrInlineRender: true,
  props: {
    initialImage: {}
  },
  emits: ["image-uploaded"],
  setup(__props, { emit: __emit }) {
    ref(null);
    const previewUrl = ref("");
    const uploadProgress = ref(0);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      if (unref(previewUrl) || _ctx.initialImage) {
        _push(`<div class="relative"><img${ssrRenderAttr("src", unref(previewUrl) || _ctx.initialImage)} alt="Предпросмотр" class="w-full h-64 object-cover rounded-lg"><button class="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "trash",
          class: "w-5 h-5 text-red-500"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "plus",
          class: "w-12 h-12 text-gray-400 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-gray-500">Нажмите для загрузки изображения</p><p class="text-sm text-gray-400 mt-2">Поддерживаются форматы JPG и PNG, до 5MB</p></div>`);
      }
      _push(`<input type="file" accept="image/jpeg,image/png" class="hidden">`);
      if (unref(uploadProgress) > 0 && unref(uploadProgress) < 100) {
        _push(`<div class="w-full bg-gray-200 rounded-full h-2.5"><div class="bg-blue-500 h-2.5 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${unref(uploadProgress)}%` })}"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<div class="text-red-500 text-sm">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

export { _sfc_main as _ };
//# sourceMappingURL=RecipeImageUpload.vue2.mjs.map
