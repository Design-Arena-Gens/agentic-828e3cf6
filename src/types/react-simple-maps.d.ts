declare module "react-simple-maps" {
  import * as React from "react";

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
    };
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;

  export interface Geography {
    rsmKey: string;
    properties: Record<string, unknown>;
  }

  export interface GeographiesProps {
    geography: string;
    children: (params: { geographies: Geography[] }) => React.ReactNode;
  }

  export const Geographies: React.FC<GeographiesProps>;

  export interface GeographyProps {
    geography: Geography;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
  }

  export const Geography: React.FC<GeographyProps>;

  export interface MarkerProps {
    coordinates: [number, number];
    children?: React.ReactNode;
  }

  export const Marker: React.FC<MarkerProps>;
}
