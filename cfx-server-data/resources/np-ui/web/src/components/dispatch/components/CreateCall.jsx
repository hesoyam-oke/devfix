import React, { useEffect, useState } from "react"
import { Menu, MenuItem, Fade, Chip, Typography } from "@mui/material"
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";
import moment from 'moment'
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";

const personals = {
    "police": [
    ],
    
    "ems": [
    ]
}


function CreateCall({visibility, data}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [players, setPlayers] = useState([]);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useNuiEvent("setPlayers", setPlayers)

    useEffect(() => {
        const getPlayers = () => fetchNui("getPlayers").then(setPlayers)
    
        getPlayers()
    }, [])

    useNuiEvent("addCallPersonal", (data) => {
        AddPersonal(data)
    })
    
    return (
    <div>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            >

            <MenuItem onClick={() => {
                fetchNui("setGPSLocation", data.position)
            }}>Set GPS Location</MenuItem>
            {
                players.map(members => (
                    <MenuItem onClick={() => {
                        fetchNui("addCallPersonal", members)
                    }}>{members.code} {members.name}</MenuItem>
                ))
            }
            <MenuItem onClick={handleClose}>Dismiss Ping (From Map)</MenuItem>
        </Menu>

        

        {data.urgent == true ? (
          <div style={{ visibility: visibility ? "visible" : "hidden", borderRight:"5px solid #e73718" }} onClick={handleClick} className="relative bg-[#780f00] mb-2 w-full py-2 border-r-4 overflow-hidden overflow-y-auto">
          <div className="absolute right-0 top-0 my-2 text-white mx-3.5 text-[2rem]">
              <FaMapMarkerAlt />
          </div>

          <div className="flex justify-between mx-2">
              <div className="flex flex-1">
                <Chip color="primary" size="small" label={data.id}></Chip>
                {data.code != null ? (
                  <Chip color="secondary" size="small" className="ml-2" label={data.code}></Chip>
                ) : ""}                  
                <Typography variant="body1" sx={{ marginLeft: "8px" }}><p className="dispatch-infos-text text-white">{data.label}</p></Typography>
              </div>
              <div className="flex flex-end">
                <FaMapMarkerAlt className="text-[2em] h-[1em]" />
              </div>
          </div>

          <div className="flex flex-col justify-between items-start mx-2 mb-1 text-white">
            {data.options.map(item =>
              item.label != null ? (
                  <Item options={item} />
              ) : ""
            )}
          </div>

          <div className="flex justify-center items-center">
              <hr className="w-[96%] text-white"></hr>
          </div>

          <div className="flex flex-col justify-start items-start mx-2 mt-1.5 text-white">
              <div id="notificationEntrys">
                  <span className="dispatch-infos-text">Police: ({personals["police"].length})</span>
                  <div className="flex flex-wrap gap-2 my-1">
                      {personals["police"].map(op => 
                          <PersonelList code={op.code} name={op.name}/>    
                      )}
                  </div>
              </div>

              <div id="notificationEntrys">
                  <span className="dispatch-infos-text">EMS: ({personals["ems"].length})</span>
                  <div className="flex flex-wrap gap-2 my-1">
                      {personals["ems"].map(op => 
                          <PersonelList code={op.code} name={op.name}/>    
                      )}
                  </div>
              </div>
          </div>
      </div>
      ) : (
        <div style={{ visibility: visibility ? "visible" : "hidden" }} onClick={handleClick} className="relative bg-[#1a237e] mb-2 w-full py-2 border-r-4 border-blue-500 overflow-hidden overflow-y-auto">
            <div className="absolute right-0 top-0 my-2 text-white mx-3.5 text-[2rem]">
                <FaMapMarkerAlt />
            </div>

            <div className="flex justify-between mx-2">
                <div className="flex flex-1">
                  <Chip color="primary" size="small" label={data.id}></Chip>
                  {data.code != null ? (
                    <Chip color="secondary" size="small" className="ml-2" label={data.code}></Chip>
                  ) : ""}                  
                  <Typography variant="body1" sx={{ marginLeft: "8px" }}><p className="dispatch-infos-text text-white">{data.label}</p></Typography>
                </div>
                <div className="flex flex-end">
                  <FaMapMarkerAlt className="text-[2em] h-[1em]" />
                </div>
            </div>

            <div className="flex flex-col justify-between items-start mx-2 mb-1 text-white">
              {data.options.map(item =>
                item.label != null ? (
                    <Item options={item} />
                ) : ""
              )}
            </div>

            <div className="flex justify-center items-center">
                <hr className="w-[96%] text-white"></hr>
            </div>

            <div className="flex flex-col justify-start items-start mx-2 mt-1.5 text-white">
                <div id="notificationEntrys">
                    <span className="dispatch-infos-text">Police: ({personals["police"].length})</span>
                    <div className="flex flex-wrap gap-2 my-1">
                        {personals["police"].map(op => 
                            <PersonelList code={op.code} name={op.name}/>    
                        )}
                    </div>
                </div>

                <div id="notificationEntrys">
                    <span className="dispatch-infos-text">EMS: ({personals["ems"].length})</span>
                    <div className="flex flex-wrap gap-2 my-1">
                        {personals["ems"].map(op => 
                            <PersonelList code={op.code} name={op.name}/>    
                        )}
                    </div>
                </div>
            </div>
        </div>

      )}

    </div>
    )
} 

const Item = ({options}) => {
    return (
      <div id="notificationColumn" className="flex break-words items-center">
        <div className="text-md">
          {React.createElement(
            FaIcons[options.icon] || HiIcons[options.icon] || FaIcons["FaHeart"]
          )}
        </div>
  
        {options.isTime == true ? (
          <p className="dispatch-infos-text text-md mx-2">{moment(options.label, 'dddd MMMM Do h:mm:ss YYYY').fromNow()}</p>
        ) : (
          <p className="dispatch-infos-text text-md mx-2">{options.label}</p>
        )}
      </div>
    );
  }

const PersonelList = ({code, name}) => {
    return (
        <Chip color="primary" size="small" label={code + " " + name}>
        </Chip>
    );
}

function AddPersonal(member) {
    personals[member.job].push({
        code: member.code,
        name: member.name
    })
}

export default CreateCall