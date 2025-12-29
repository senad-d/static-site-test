import * as React from "react";

declare module "react-resizable-panels" {
  export type Direction = "horizontal" | "vertical";

  export interface PanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: Direction;
  }

  export const PanelGroup: React.FC<PanelGroupProps>;

  export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    collapsible?: boolean;
    order?: number;
    id?: string;
  }

  export const Panel: React.FC<PanelProps>;

  export interface PanelResizeHandleProps
    extends React.HTMLAttributes<HTMLDivElement> {
    id?: string;
  }

  export const PanelResizeHandle: React.FC<PanelResizeHandleProps>;

  const ReactResizablePanels: {
    PanelGroup: typeof PanelGroup;
    Panel: typeof Panel;
    PanelResizeHandle: typeof PanelResizeHandle;
  };

  export default ReactResizablePanels;
}