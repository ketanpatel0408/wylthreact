import { Tooltip, Zoom } from "@mui/material";

export const CustomTooltip = ({ children, ...otherProps }) => (
  <Tooltip
    arrow
    slots={{ transition: Zoom }}
    PopperProps={{
      modifiers: [
        {
          name: "preventOverflow",
          options: { boundary: "window" },
        },
        {
          name: "flip",
          options: { fallbackPlacements: ["top", "bottom", "left", "right"] },
        },
      ],
      sx: { zIndex: 9999 },
    }}
    {...otherProps}
  >
    {children}
  </Tooltip>
);