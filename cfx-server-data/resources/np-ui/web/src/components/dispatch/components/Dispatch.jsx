import React, { useState, useRef, useEffect } from "react";
import { Menu, MenuItem, Slide, Chip, Typography } from "@mui/material";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";
import moment from "moment";
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";

export function Dispatch({visibility, data}) {
  const [checked, setChecked] = useState(false);
  const containerRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if(visibility == false) {
      setChecked(true)
      
      setTimeout(() => {
        setChecked(false)
      }, 5000)
    }
  }, [])

  if(visibility == false) {
    return (
      <div>
        <div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => {
              fetchNui("setGPSLocation", data.coords)
            }}>Set GPS Location</MenuItem>
            <MenuItem onClick={() => {
              fetchNui("createCall", data)
            }}>Create Call</MenuItem>
            <MenuItem onClick={() => {
              fetchNui("dismissDispatch", {id: data.id, data: data})
            }}>
              Dismiss Ping (From Map/List)
            </MenuItem>
          </Menu>
  
          {data.urgent == true ? (
          <Slide
          direction="left"
          timeout={{ appear: 1000, enter: 1000, exit: 1000 }}
          in={checked}
          container={containerRef.current}
        > 
          <div onClick={handleClick} className="relative text-white p-2 mb-2 mr-4" style={{ borderRight: "5px solid rgb(231,55,24)", backgroundColor: "rgba(120, 15, 0, 0.824)" }}>
            <div className="flex justify-between">
              <div className="flex flex-1">
                <Chip color="primary" size="small" label={data.id}></Chip>
                {data.code != null ? (
                  <Chip color="secondary" size="small" className="ml-2" label={data.code}></Chip>
                ) : ""}
                <Typography variant="body1" sx={{ marginLeft: "8px" }}><p className="dispatch-infos-text">{data.label}</p></Typography>
              </div>
              <div className="flex flex-end">
                <FaMapMarkerAlt className="text-[2em] h-[1em]" />
              </div>
            </div>

            {data.options.map(item =>
              item.label != null ? (
                <Item options={item} />
              ) : ""
            )}
          </div>
        </Slide>
      ) : (
        <Slide
        direction="left"
        timeout={{ appear: 1000, enter: 1000, exit: 1000 }}
        in={checked}
        container={containerRef.current}
      > 
        <div onClick={handleClick} className="relative text-white p-2 mb-2 mr-4" style={{ borderRight: "5px solid rgb(24, 127, 231)", backgroundColor: "rgba(0, 52, 100, 0.824)" }}>
          <div className="flex justify-between">
            <div className="flex flex-1">
              <Chip color="primary" size="small" label={data.id}></Chip>
              {data.code != null ? (
                <Chip color="secondary" size="small" className="ml-2" label={data.code}></Chip>
              ) : ""}
              <Typography variant="body1" sx={{ marginLeft: "8px" }}><p className="dispatch-infos-text">{data.label}</p></Typography>
            </div>
            <div className="flex flex-end">
              <FaMapMarkerAlt className="text-[2em] h-[1em]" />
            </div>
          </div>

          {data.options.map(item =>
            item.label != null ? (
              <Item options={item} />
            ) : ""
          )}
        </div>
      </Slide>

      )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => {
              fetchNui("setGPSLocation", data.coords)
            }}>Set GPS Location</MenuItem>
            <MenuItem onClick={() => {
              fetchNui("createCall", data)
            }}>Create Call</MenuItem>
            <MenuItem onClick={() => {
              fetchNui("dismissDispatch", {id: data.id, data: data})
            }}>
              Dismiss Ping (From Map/List)
            </MenuItem>
          </Menu>
  
          
        </div>

        {data.urgent == true ? (
          <div onClick={handleClick} className="relative text-white p-2 mb-2 mr-4" style={{ borderRight: "5px solid rgb(231,55,24)", backgroundColor: "rgba(120, 15, 0, 0.824)" }}>
          <div className="flex justify-between">
            <div className="flex flex-1">
              <Chip color="primary" size="small" label={data.id}></Chip>
              {data.code != null ? (
                <Chip color="secondary" size="small" className="ml-2" label={data.code}></Chip>
              ) : ""}                  
              <Typography variant="body1" sx={{ marginLeft: "8px" }}><p className="dispatch-infos-text">{data.label}</p></Typography>
            </div>
            <div className="flex flex-end">
              <FaMapMarkerAlt className="text-[2em] h-[1em]" />
            </div>
          </div>

          {data.options.map(item =>
            item.label != null ? (
              <Item options={item} />
            ) : ""
          )}
        </div>
      ) : (
        <div onClick={handleClick} className="relative text-white p-2 mb-2 mr-4" style={{ borderRight: "5px solid rgb(24, 127, 231)", backgroundColor: "rgba(0, 52, 100, 0.824)" }}>
              <div className="flex justify-between">
                <div className="flex flex-1">
                  <Chip color="primary" size="small" label={data.id}></Chip>
                  {data.code != null ? (
                    <Chip color="secondary" size="small" className="ml-2" label={data.code}></Chip>
                  ) : ""}                  
                  <Typography variant="body1" sx={{ marginLeft: "8px" }}><p className="dispatch-infos-text">{data.label}</p></Typography>
                </div>
                <div className="flex flex-end">
                  <FaMapMarkerAlt className="text-[2em] h-[1em]" />
                </div>
              </div>

              {data.options.map(item =>
                item.label != null ? (
                  <Item options={item} />
                ) : ""
              )}
            </div>

      )}
      </div>
    );
  }
}

const Item = ({options}) => {

  return (
    
    <div id="notificationColumn" className="flex break-words items-center">
      <div className="text-md">
        {options.showIcon == null ? (
          React.createElement(
            FaIcons[options.icon] || HiIcons[options.icon] || FaIcons["FaHeart"]
          )
        ) : ""}
      </div>
      
      {options.isTime == true ? (
        <p className="dispatch-infos-text text-md mx-2">{GetMomentTime(options.label)}</p>
      ) : (
        <p className="dispatch-infos-text text-md mx-2">{options.label}</p>
      )}
    </div>
  );
}

function GetMomentTime(label) {
  return moment(label, 'dddd MMMM Do h:mm:ss YYYY').fromNow()
}