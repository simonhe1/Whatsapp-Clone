import React, { useState, useRef } from "react";
import {
  IconButton,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./SidebarSettings.css";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

const SidebarSettings = () => {
  const [{ user }, dispatch] = useStateValue();

  const [showSettings, setShowSettings] = useState(false);
  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setShowSettings(false);
  };

  const handleSignOut = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="sidebar_settings">
      <IconButton
        variant="contained"
        ref={anchorRef}
        onClick={() => setShowSettings((showSettings) => !showSettings)}
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        open={showSettings}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {
                    <MenuItem key={"Sign Out"} onClick={handleSignOut}>
                      {"Sign Out"}
                    </MenuItem>
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default SidebarSettings;
