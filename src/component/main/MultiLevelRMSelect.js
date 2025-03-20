import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, Avatar, Button } from "@mui/material";
import { useAlert } from "./alert/AlertProvider";

const rmData = [
  {
    id: "14107",
    name: "Jaydeep Patel",
    imageUrl: "https://picsum.photos/60",
    children: [
      {
        id: "14249",
        name: "Jaydeep LevelTwo",
        imageUrl: "https://picsum.photos/60",
        children: [{ id: "19877", name: "Sagar Patel", imageUrl: "" }, { id: "1098887", name: "Mahes Patel", imageUrl: "" }],
      },
      {
        id: "24187",
        name: "Stest Stestts",
        imageUrl: "",
        children: [{ id: "102200", name: "David Bekham", imageUrl: "" }],
      },
      { id: "67105", name: "Sahiln NNN Aptel", imageUrl: "" },
    ],
  },
];

const lastChild = rmData[0].children[rmData[0].children.length - 1];
const lastChildHasChildren = lastChild.children;

let TotalLastChildHeight = null;
if (lastChildHasChildren !== undefined) {
  TotalLastChildHeight = 55 + (lastChildHasChildren.length * 55 - lastChildHasChildren.length);
} else {
  TotalLastChildHeight = null;
}

const renderOptions = (managers, selected, handleCheckboxChange, level = 0) => {
  return managers.map((manager) => {
    const isChecked = selected.includes(manager.id);
    const hasChildren = manager.children && manager.children.length > 0;

    let imageBorder = "#214A6D";
    let beforePadding = {};
    let beforeStyles = {};
    let dashedLineBefore = {};
    let dashedLineAfter = {};

    if (level === 0) {
      imageBorder = "#FF8900";
      beforePadding = {
        paddingLeft: "20px"
      };
      beforeStyles = {
        content: '""',
        background: "#FF8900",
        width: "8px",
        height: "8px",
        position: "absolute",
        top: "22px",
        left: "0",
        borderRadius: "100%",
        zIndex: 3,
      };
      dashedLineBefore = {
        content: '""',
        display: "block",
        position: "absolute",
        top: "23px",
        left: "23px",
        bottom: 0,
        width: 0,
        borderLeft: "1px dashed rgba(33, 74, 109, 0.64)",
        height: lastChildHasChildren === undefined ? "calc(100% - 50px)" : `calc(100% - ${TotalLastChildHeight}px`,
        zIndex: 2,
      };
    } else if (level === 1) {
      imageBorder = "#214A6D";
      beforePadding = {
        paddingLeft: "60px"
      };
      beforeStyles = {
        content: '""',
        background: "#214A6D",
        width: "8px",
        height: "8px",
        position: "absolute",
        top: "23px",
        left: "0",
        borderRadius: "100%",
        zIndex: 1,
      };

      dashedLineAfter = {
        content: '""',
        display: "block",
        position: "absolute",
        top: "27px",
        left: "-35px",
        width: "35px",
        borderTop: "1px dashed rgba(33, 74, 109, 0.64)",
      }
    } else if (level >= 2) {
      imageBorder = "#214A6D";
      beforePadding = {
        paddingLeft: "90px"
      };
      beforeStyles = {
        content: '""',
        width: "0",
        height: "0",
        borderBottom: "9px solid #67C89B",
        borderLeft: "4px solid transparent",
        borderRight: "4px solid transparent",
        position: "absolute",
        top: "23px",
        left: "0",
        zIndex: 1,
      };
      dashedLineBefore = {
        content: '""',
        display: "block",
        position: "absolute",
        top: "-23px",
        left: "63.5px",
        bottom: 0,
        width: 0,
        borderLeft: "1px dashed rgba(33, 74, 109, 0.64)",
        height: "calc(100% - 3px)",
      };
      dashedLineAfter = {
        content: '""',
        display: "block",
        position: "absolute",
        top: "27px",
        left: "-25px",
        width: "30px",
        borderTop: "1px dashed rgba(33, 74, 109, 0.64)",
      }
    }

    const imageUrl = manager.imageUrl || "";

    return (
      <div key={manager.id} className="relative">
        <div style={beforePadding} className={`border-b-[1px] ${isChecked ? "bg-blue-100" : "bg-white"} ${level === 0 ? "pl-3" : ""}`}>
          <span className="absolute" style={dashedLineBefore}></span>

          <MenuItem className="!pr-2" value={manager.id} onClick={(e) => e.stopPropagation()}>
            {level < 0 ? <span className="absolute" style={dashedLineBefore}></span> : ""}
            <span className="absolute" style={dashedLineAfter}></span>
            <span className="absolute" style={beforeStyles}></span>

            {imageUrl ? (
              <img
                src={imageUrl}
                alt={manager.name}
                style={{
                  borderRadius: "100%",
                  opacity: 1,
                  width: "30px",
                  height: "30px",
                  objectFit: "cover",
                  objectPosition: "center",
                  marginRight: "5px",
                  border: `1px solid ${imageBorder}`,
                }}
              />
            ) : (
              <Avatar
                style={{
                  backgroundColor: imageBorder,
                  marginRight: "5px",
                  width: "30px",
                  height: "30px",
                }}
              >
                {manager.name.charAt(0)}
              </Avatar>
            )}

            <ListItemText primary={<span className="!text-[14px]"> {manager.name} </span>} />
            <Checkbox
              checked={isChecked}
              indeterminate={
                hasChildren &&
                manager.children.some((child) => selected.includes(child.id)) &&
                !isChecked
              }
              sx={{
                '& .MuiSvgIcon-root': {
                  fill: isChecked ? '#5CBE6F' : '',
                },
              }}
              onChange={() => handleCheckboxChange(manager)}
            />
          </MenuItem>
        </div>
        {hasChildren &&
          renderOptions(manager.children, selected, handleCheckboxChange, level + 1)}
      </div>
    );
  });
};

const MultiLevelRMSelect = () => {
  const [selectedRMs, setSelectedRMs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const showAlert = useAlert();

  const handleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedRMs([]);
    } else {
      const allIds = [];
      const flattenData = (data) => {
        data.forEach((rm) => {
          allIds.push(rm.id);
          if (rm.children) flattenData(rm.children);
        });
      };
      flattenData(rmData);
      setSelectedRMs(allIds);
    }
    setSelectAllChecked(!selectAllChecked);
  };

  const handleCheckboxChange = (manager) => {
    let newSelected = [...selectedRMs];

    const toggleSelection = (rm, isSelected) => {
      if (isSelected) {
        if (!newSelected.includes(rm.id)) newSelected.push(rm.id);
      } else {
        newSelected = newSelected.filter((id) => id !== rm.id);
      }
      if (rm.children) {
        rm.children.forEach((child) => toggleSelection(child, isSelected));
      }
    };

    const isCurrentlySelected = newSelected.includes(manager.id);
    toggleSelection(manager, !isCurrentlySelected);

    const updateParentSelection = (parent) => {
      if (!parent) return;
      const allChildrenSelected = parent.children.every((child) => newSelected.includes(child.id));
      if (allChildrenSelected) {
        if (!newSelected.includes(parent.id)) newSelected.push(parent.id);
      } else {
        newSelected = newSelected.filter((id) => id !== parent.id);
      }
    };

    rmData.forEach((root) => {
      const findParent = (node, parent = null) => {
        if (node.children) {
          node.children.forEach((child) => {
            if (child.id === manager.id) {
              updateParentSelection(node);
            } else {
              findParent(child, node);
            }
          });
        }
      };
      findParent(root);
    });

    setSelectedRMs(newSelected);
  };

  const handleApplyClick = () => {
    if (selectedRMs.length === 0) {
      showAlert("Please select at least one Relationship Manager.", "error");
    } else {
      setOpen(false);
      // showAlert("Success: Form submitted successfully!", "success");
    }
  };

  return (
    <div className="w-full">
      <FormControl fullWidth>
        <InputLabel>Relationship Manager</InputLabel>
        <Select
          multiple
          value={selectedRMs}
          onChange={() => { }}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          input={<OutlinedInput label="Relationship Manager" />}
          renderValue={(selected) => {
            const allRMs = [];
            const flattenData = (data) => {
              data.forEach((rm) => {
                allRMs.push(rm);
                if (rm.children) {
                  flattenData(rm.children);
                }
              });
            };

            flattenData(rmData);

            const selectedNames = selected
              .map((id) => {
                const found = allRMs.find((r) => r.id === id);
                return found ? found.name : null;
              })
              .filter(Boolean)
              .join(", ");

            return selectedNames;
          }}
          className="bg-white"
          MenuProps={{
            PaperProps: {
              sx: {
                "& .MuiMenuItem-root": {
                  "&:hover": {
                    backgroundColor: "transparent !important",
                  },
                },
              },
            },
          }}
        >
          <MenuItem key="select-all" onClick={handleSelectAll} className="!px-2 divide-y-4 divide-y-reverse divide-gray-200">
            <ListItemText primary="Select All" />
            <Checkbox
              checked={selectAllChecked}
              sx={{
                '& .MuiSvgIcon-root': {
                  fill: selectAllChecked ? '#5CBE6F' : '',
                },
              }}
            />
          </MenuItem>

          {renderOptions(rmData, selectedRMs, handleCheckboxChange)}

          <div className="p-2 pr-[20px] sticky bottom-0 z-[10] bg-white text-right">
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyClick}
              className="mt-4"
            >
              Apply
            </Button>

          </div>
        </Select>
      </FormControl>
      
    </div>
  );
};

export default MultiLevelRMSelect;