import * as L from 'leaflet'
import type { L } from 'leaflet'

declare module 'leaflet.markercluster' {
  export interface MarkerCluster extends L.Marker {
    getAllChildMarkers(): L.Marker[]
    getChildCount(): number
    zoomToBounds(): void
    spiderfy(): void
    unspiderfy(): void
  }

  export interface MarkerClusterGroupOptions extends L.LayerOptions {
    maxClusterRadius?: number
    spiderfyOnMaxZoom?: boolean
    showCoverageOnHover?: boolean
    zoomToBoundsOnClick?: boolean
    animate?: boolean
    animateAddingMarkers?: boolean
    removeOutsideVisibleBounds?: boolean
    chunkedLoading?: boolean
    chunkInterval?: number
    chunkDelay?: number
    iconCreateFunction?: (cluster: MarkerCluster) => L.DivIcon
  }

  export class MarkerClusterGroup extends L.LayerGroup {
    constructor(options?: MarkerClusterGroupOptions)
    addLayers(layers: L.Layer[]): this
    removeLayers(layers: L.Layer[]): this
    clearLayers(): this
    getLayers(): L.Layer[]
    getChildCount(): number
    getAllChildMarkers(): L.Marker[]
    zoomToBounds(): void
    spiderfy(): void
    unspiderfy(): void
  }

  export function markerClusterGroup(options?: MarkerClusterGroupOptions): MarkerClusterGroup
}

declare module 'leaflet' {
  export function markerClusterGroup(options?: MarkerClusterGroupOptions): MarkerClusterGroup
} 