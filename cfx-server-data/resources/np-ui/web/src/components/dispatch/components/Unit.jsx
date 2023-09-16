import { Chip, Typography } from "@mui/material";
import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNuiEvent } from "../../../hooks/useNuiEvent";
import { fetchNui } from "../../../utils/fetchNui";

function Unit({ visibility }) {
  const [units, setUnits] = useState([]);
  useNuiEvent("setUnits", setUnits);
  const [players, setPlayers] = useState([]);
  useNuiEvent("setPlayers", setPlayers);

  useEffect(() => {
    const getPlayers = () => fetchNui("getPlayers").then(setPlayers)
    const getUnits = () => fetchNui("getUnits").then(setUnits)

    getUnits()
    getPlayers()
  }, [])

  return (
    <div style={{ visibility: visibility ? "visible" : "hidden" }} className="bg-[#232833] text-[#e8e8e8] w-full h-[30%] flex flex-row items-start border-t-[3px] border-blue-500 overflow-hidden overflow-y-auto mr-4">
      <div className="h-full flex-1 p-2 font-default">
        <p>Police</p>
        <div className="flex flex-col gap-1">
          {units.map((unit) =>
            unit.type == "police" ? <Item data={unit} players={players} /> : ""
          )}
        </div>
      </div>
      <div className="h-full flex-1 p-2 font-default">
        <p>EMS</p>
        <div className="flex flex-col gap-1">
          {units.map((unit) =>
            unit.type == "ems" ? <Item data={unit} players={players} /> : ""
          )}
        </div>
      </div>
    </div>
  );
}

const Item = ({ data, players }) => {
  const [anchorEl, setAnchor] = useState(null)
  const [clickedId, setClickedId] = useState(0);
  const open = Boolean(anchorEl);
  const [buttons, setButtons] = useState({
    firstButtons: [
      {
        name: "Vehicle: Car",
        icon: "FaCarSide",
        onClick: () => fetchNui("changeUnitVehicle", { unitId: data.unitId, icon: "FaCarSide" })
      },
      {
        name: "Vehicle: Helicopter",
        icon: "FaHelicopter",
        onClick: () => fetchNui("changeUnitVehicle", { unitId: data.unitId, icon: "FaHelicopter" })
      },
      {
        name: "Vehicle: Motorbike",
        icon: "FaMotorcycle",
        onClick: () => fetchNui("changeUnitVehicle", { unitId: data.unitId, icon: "FaMotorcycle" })
      },
      {
        name: "Vehicle: Bicycle",
        icon: "FaBicycle",
        onClick: () => fetchNui("changeUnitVehicle", { unitId: data.unitId, icon: "FaBicycle" })
      },
    ],
  })
  const isCaptan = () => anchorEl?.parentNode.firstChild == anchorEl

  return (
    <div className="flex items-center bg-[#31475e] p-1 py-1.5">
      <div className="text-[2.5vh] mx-2">
        {React.createElement(FaIcons[data.icon] ?? FaIcons["FaHeart"])}
      </div>
      <div className="flex flex-wrap gap-1">
        {data.users?.map((user, key) => (
          <Chip color="primary" size="small" label={user.code + " " + user.name} onClick={(e) => { setAnchor(e.currentTarget); setClickedId(key) }} />
        ))}
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchor(null)}
      >
        {isCaptan() ?
          buttons["firstButtons"].map(btn => btn.icon == data.icon ? "" : <MenuItem onClick={btn.onClick}>{btn.name}</MenuItem>) : <MenuItem onClick={() => {
            fetchNui("removePlayerFromUnit", { unitId: data.unitId, playerIndex: clickedId, citizenid: players[clickedId].citizenid, name: players[clickedId].name, code: players[clickedId].code })
            setAnchor(null)
          }}>Remove From Unit</MenuItem>}
        {players?.map(player => data.users?.findIndex(x => x.citizenid == player.citizenid) === -1 
            ? 
              <MenuItem onClick={() => fetchNui("addPlayerToUnit", { unitId: data.unitId, citizenid: player.citizenid, name: player.name, code: player.code })}>{player.code} {player.name}</MenuItem> 
            : "")}
      </Menu>
    </div>
  );
};

export default Unit;
