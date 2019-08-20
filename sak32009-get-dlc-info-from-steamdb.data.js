// ==UserData==
// @name          Get DLC Info from SteamDB - Data
// @description   Include in main script the data formats
// @author        Sak32009
// @version       1.0.0
// @license       MIT
// ==/UserData==

const GetDLCInfofromSteamDBFormats = {
    // CREAMAPI LEGIT 4.0.0.0
    creamAPI_legit_4_0_0_0: {
        name: "CreamAPI - A Legit DLC Unlocker v4.0.0.0",
        noHeader: false,
		replaceHeaderWith: false,
        callback: function(main){
            return {
				name: "cream_api.ini",
				data: `[steam]
; Application ID (http://store.steampowered.com/app/%appid%/)
appid = [steamdb]appID[/steamdb]
; Current game language.
; Uncomment this option to turn it on.
; Default is "english".
;language = german
; Enable/disable automatic DLC unlock. Default option is set to "false".
; Keep in mind that this option is highly experimental and won't
; work if the game wants to call each DLC by index.
unlockall = false
; Original Valve's steam_api.dll.
; Default is "steam_api_o.dll".
orgapi = steam_api_o.dll
; Original Valve's steam_api64.dll.
; Default is "steam_api64_o.dll".
orgapi64 = steam_api64_o.dll
; Enable/disable extra protection bypasser.
; Default is "false".
extraprotection = false
; The game will think that you're offline (supported by some games).
; Default is "false".
forceoffline = false
; Some games are checking for the low violence presence.
; Default is "false".
;lowviolence = true
; Purchase timestamp for the DLC (http://www.onlineconversion.com/unix_time.htm).
; Default is "0" (1970/01/01).
;purchasetimestamp = 0

[steam_misc]
; Disables the internal SteamUser interface handler.
; Does have an effect on the games that are using the license check for the DLC/application.
; Default is "false".
disableuserinterface = false

[dlc]
; DLC handling.
; Format: <dlc_id> = <dlc_description>
; e.g. : 247295 = Saints Row IV - GAT V Pack
; If the DLC is not specified in this section
; then it won't be unlocked
[dlcs]{dlc_id} = {dlc_name}\n[/dlcs]`
			};
        },
        options: {}
    }
    /*,
        // CREAMAPI 3.4.1.0
        creamAPI_3_4_1_0: {
            name: "CreamAPI Legacy v3.4.1.0",
            callback({
                info
            }, app) {
                return {
                    name: "cream_api.ini",
                    data: `[steam]
    ; Application ID (http://store.steampowered.com/app/%appid%/)
    appid = [steamdb]appID[/steamdb]
    ; Current game language.
    ; Uncomment this option to turn it on.
    ; Default is "english".
    ;language = german
    ; Enable/disable automatic DLC unlock. Default option is set to "false".
    ; Keep in mind that this option is highly experimental and won't
    ; work if the game wants to call each DLC by index.
    unlockall = false
    ; Original Valve's steam_api.dll.
    ; Default is "steam_api_o.dll".
    orgapi = steam_api_o.dll
    ; Original Valve's steam_api64.dll.
    ; Default is "steam_api64_o.dll".
    orgapi64 = steam_api64_o.dll
    ; Enable/disable extra protection bypasser.
    ; Default is "false".
    extraprotection = false
    ; The game will think that you're offline (supported by some games).
    ; Default is "false".
    forceoffline = false
    ; Some games are checking for the low violence presence.
    ; Default is "false".
    ;lowviolence = true
    ; Installation path for the game.
    ; Note, that you can use ..\\ to set the parent directory (from where executable file is located).
    ; Maximum number of parent directories: 5 (..\\..\\..\\..\\..\\)
    ; Default is the path to current working directory.
    ;installdir = ..\\
    ; Use DLC id as the appended installation directory.
    ; e.g. <install_directory>\\480
    ; Default is "true".
    ;dlcasinstalldir = false
    ; Purchase timestamp for the DLC (http://www.onlineconversion.com/unix_time.htm).
    ; Default is "0" (1970/01/01).
    ;purchasetimestamp = 0
    ; Turn on the wrapper mode.
    ; Default is "false".
    wrappermode = false

    [steam_misc]
    ; Disables the internal SteamUser interface handler.
    ; Does have an effect on the games that are using the license check for the DLC/application.
    ; Default is "false".
    disableuserinterface = false
    ; Disables the internal SteamUtils interface handler.
    ; Does have an effect on the games that are checking for the actual AppId (only matters when "wrappermode" is set to "true").
    ; Default is "false".
    disableutilsinterface = false
    ; Disable the internal reserve hook of the "Steam_RegisterInterfaceFuncs" function.
    ; Default is "false".
    disableregisterinterfacefuncs = false
    ; Unlock/Lock Steam parental restrictions.
    ; Default is "true".
    ;unlockparentalrestrictions = false
    ; SteamId64 to override. Note that this action could be risky !
    ; This option can only work if "disableuserinterface = false".
    ;steamid = 0
    ; Bypass VAC signature check. Note that this action could be risky !
    ; Default is "false".
    ;signaturebypass = true

    [steam_wrapper]
    ; Application ID to override (used when the wrapper mode is on)
    newappid = 0
    ; Use the internal storage system.
    ; Default is "false".
    wrapperremotestorage = false
    ; Use the internal stats/achievements system.
    ; Default is "false".
    wrapperuserstats = false
    ; Use the internal workshop (UGC) system.
    ; Default is "false".
    wrapperugc = false
    ; Store the data in the current directory (incl. stats)
    ; By default the data is stored at: %appdata%/CreamAPI/%appid%/
    ; Default is "false".
    saveindirectory = false
    ; Force the usage of a full save path instead of the relative one.
    ; Default is "false".
    forcefullsavepath = false
    ; Disable internal callbacks system.
    ; Default is "false".
    ;disablecallbacks = true
    ; Disable/Enable a StoreStats callback. Takes effect only if "wrapperuserstats" is set to "true".
    ; Default is "true".
    ;storestatscallback = false
    ; Fixed achievements count.
    ; Some games can only work if this option is configured properly (e.g. Wolfenstein II).
    ; Default is "0".
    achievementscount = 0

    [dlc]
    ; DLC handling.
    ; Format: <dlc_id> = <dlc_description>
    ; e.g. : 247295 = Saints Row IV - GAT V Pack
    ; If the DLC is not specified in this section
    ; then it won't be unlocked
    [dlcs]{dlc_id} = {dlc_name}\n[/dlcs]
    [dlc_installdirs]
    ; Installation path for the specific DLC (dependent from "installdir" option).
    ; This section works only if "dlcasinstalldir" option is set to "false".
    ; Format: <dlc_id> = <install_dir>
    ; e.g. : 556760 = DLCRoot0

    [steam_ugc]
    ; Subscribed workshop items.
    ; This section works only if "wrappermode" and "wrapperugc" options are set to "true".
    ; Format: <dlc_id> = <true/false>
    ; e.g. : 812713531 = true
    ; Please refer to __README_WORKSHOP_EN__.txt for more details.`
                };
            },
            options: {}
        },
        // CREAMAPI v3.3.0.0
        creamAPI_3_3_0_0: {
            name: "CreamAPI Legacy v3.3.0.0",
            callback({
                info
            }, app) {
                return {
                    name: "cream_api.ini",
                    data: `[steam]
    ; Application ID (http://store.steampowered.com/app/%appid%/)
    appid = [steamdb]appID[/steamdb]
    ; Current game language.
    ; Uncomment this option to turn it on.
    ; Default is "english".
    ;language = german
    ; Enable/disable automatic DLC unlock. Default option is set to "false".
    ; Keep in mind that this option is highly experimental and won't
    ; work if the game wants to call each DLC by index.
    unlockall = false
    ; Original Valve's steam_api.dll.
    ; Default is "steam_api_o.dll".
    orgapi = steam_api_o.dll
    ; Original Valve's steam_api64.dll.
    ; Default is "steam_api64_o.dll".
    orgapi64 = steam_api64_o.dll
    ; Enable/disable extra protection bypasser.
    ; Default is "false".
    extraprotection = false
    ; The game will think that you're offline (supported by some games).
    ; Default is "false".
    forceoffline = false
    ; Some games are checking for the low violence presence.
    ; Default is "false".
    ;lowviolence = true
    ; Installation path for the game.
    ; Note, that you can use ..\\ to set the parent directory (from where executable file is located).
    ; Maximum number of parent directories: 5 (..\\..\\..\\..\\..\\)
    ; Default is the path to current working directory.
    ;installdir = ..\\
    ; Use DLC id as the appended installation directory.
    ; e.g. <install_directory>\\480
    ; Default is "true".
    ;dlcasinstalldir = false
    ; Purchase timestamp for the DLC (http://www.onlineconversion.com/unix_time.htm).
    ; Default is "0" (1970/01/01).
    ;purchasetimestamp = 0
    ; Turn on the wrapper mode.
    ; Default is "false".
    wrappermode = false

    [steam_misc]
    ; Disables the internal SteamUser interface handler.
    ; Does have an effect on the games that are using the license check for the DLC/application.
    ; Default is "false".
    disableuserinterface = false
    ; Disables the internal SteamUtils interface handler.
    ; Does have an effect on the games that are checking for the actual AppId (only matters when "wrappermode" is set to "true").
    ; Default is "false".
    disableutilsinterface = false
    ; Unlock/Lock Steam parental restrictions.
    ; Default is "true".
    ;unlockparentalrestrictions = false
    ; SteamId64 to override. Note that this action could be risky !
    ; This option can only work if "disableuserinterface = false".
    ;steamid = 0
    ; Bypass VAC signature check. Note that this action could be risky !
    ; Default is "false".
    ;signaturebypass = true

    [steam_wrapper]
    ; Application ID to override (used when the wrapper mode is on)
    newappid = 0
    ; Use the internal storage system.
    ; Default is "false".
    wrapperremotestorage = false
    ; Use the internal stats/achievements system.
    ; Default is "false".
    wrapperuserstats = false
    ; Use the internal workshop (UGC) system.
    ; Default is "false".
    wrapperugc = false
    ; Store the data in the current directory (incl. stats)
    ; By default the data will is stored at: %appdata%/CreamAPI/%appid%/
    ; Default is "false".
    saveindirectory = false
    ; Disable internal callbacks system.
    ; Default is "false".
    ;disablecallbacks = true
    ; Disable/Enable a StoreStats callback. Takes effect only if "wrapperuserstats" is set to "true".
    ; Default is "true".
    ;storestatscallback = false
    ; Fixed achievements count.
    ; Some games can only work if this option is configured properly (e.g. Wolfenstein II).
    ; Default is "0".
    achievementscount = 0

    [dlc]
    ; DLC handling.
    ; Format: <dlc_id> = <dlc_description>
    ; e.g. : 247295 = Saints Row IV - GAT V Pack
    ; If the DLC is not specified in this section
    ; then it won't be unlocked
    [dlcs]{dlc_id} = {dlc_name}\n[/dlcs]
    [dlc_installdirs]
    ; Installation path for the specific DLC (dependent from "installdir" option).
    ; This section works only if "dlcasinstalldir" option is set to "false".
    ; Format: <dlc_id> = <install_dir>
    ; e.g. : 556760 = DLCRoot0

    [steam_ugc]
    ; Subscribed workshop items.
    ; This section works only if "wrappermode" and "wrapperugc" options are set to "true".
    ; Format: <dlc_id> = <true/false>
    ; e.g. : 812713531 = true
    ; Please refer to __README_WORKSHOP_EN__.txt for more details.`
                };
            },
            options: {}
        },
        // CREAMAPI v3.0.0.3 Hotfix
        creamAPI_3_0_0_3_h: {
            name: "CreamAPI Legacy v3.0.0.3 Hotfix",
            callback({
                info
            }, app) {
                return {
                    name: "cream_api.ini",
                    data: `[steam]
    ; Application ID (http://store.steampowered.com/app/%appid%/)
    appid = [steamdb]appID[/steamdb]
    ; Force the usage of specific language.
    ; Uncomment this option to turn it on.
    ;language = german
    ; Enable/disable automatic DLC unlock. Default option is set to "false".
    ; Keep in mind that this option is highly experimental and won't
    ; work if the game wants to call each DLC by index.
    unlockall = false
    ; Original Valve's steam_api.dll.
    ; Default is "steam_api_o.dll".
    orgapi = steam_api_o.dll
    ; Original Valve's steam_api64.dll.
    ; Default is "steam_api64_o.dll".
    orgapi64 = steam_api64_o.dll
    ; Enable/disable extra protection bypasser.
    ; Default is "false".
    extraprotection = false
    ; This option will force the usage of the default Steam user data folder.
    ; Default is "true".
    ;forceuserdatafolder = false
    ; The game will think that you're offline (supported by some games).
    ; Default is "false".
    forceoffline = false
    ; Some games are checking for the low violence presence.
    ; Default is "false".
    ;lowviolence = true
    ; Disables the internal SteamUser interface handler.
    ; Does have an effect on the games that are using the license check for the DLC/application.
    ; Default is "false".
    disableuserinterface = false
    ; Disables the internal SteamUtils interface handler.
    ; Does have an effect on the games that are checking for the actual AppId (only matters when "wrappermode" is set to "true").
    ; Default is "false".
    disableutilsinterface = false
    ; Turn on the wrapper mode.
    ; Default is "false".
    wrappermode = false

    [steam_wrapper]
    ; Application ID to override (used when the wrapper mode is on)
    newappid = 0
    ; Use the internal storage system.
    ; Default is "false".
    wrapperremotestorage = false
    ; Use the internal stats/achievements system.
    ; Default is "false".
    wrapperuserstats = false
    ; Store the data in the current directory (incl. stats)
    ; By default the data will is stored at: %appdata%/CreamAPI/%appid%/
    ; Default is "false".
    saveindirectory = false
    ; Disable/Enable a StoreStats callback. Takes effect only if "wrapperuserstats" is set to "true".
    ; Default is "true"
    ;storestatscallback = false

    [dlc]
    ; DLC handling.
    ; Format: <dlc_id> = <dlc_description>
    ; e.g. : 247295 = Saints Row IV - GAT V Pack
    ; If the DLC is not specified in this section
    ; then it won't be unlocked
    [dlcs]{dlc_id} = {dlc_name}\n[/dlcs]`
                };
            },
            options: {}
        },
        // CREAMAPI v2.0.0.7
        creamAPI_2_0_0_7: {
            name: "CreamAPI Legacy v2.0.0.7",
            callback({
                info
            }, app) {
                return {
                    name: "cream_api.ini",
                    data: `[steam]
    ; Application ID (http://store.steampowered.com/app/%appid%/)
    appid = [steamdb]appID[/steamdb]
    ; Force the usage of specific language.
    ; Uncomment this option to turn it on.
    ;language = german
    ; Enable/disable automatic DLC unlock. Default option is set to "false".
    ; Keep in mind that this option is highly experimental and won't
    ; work if game wants to call each DLC by index.
    unlockall = false
    ; Original Valve's steam_api.dll.
    ; Default is "steam_api_o.dll".
    orgapi = steam_api_o.dll
    ; Original Valve's steam_api64.dll.
    ; Default is "steam_api64_o.dll".
    orgapi64 = steam_api64_o.dll
    ; Enable/disable extra protection bypasser.
    ; Default is "false".
    extraprotection = false
    ; ExtraProtection level.
    ; Default is "0".
    ; Available options :
    ; 0 = minimum, 1 = medium, 2 = maximum
    extraprotectionlevel = 0
    ; Turn on the "light" wrapper mode.
    ; Default is "false".
    wrappermode = false
    ; Enable/disable logging of the DLC functions.
    ; Default is "false".
    ; If you use log_build, uncomment this option to turn it on.
    ;log = false

    [steam_wrapper]
    ; Application ID to override (used when the wrapper mode is on)
    newappid = 0
    ; Load steam emulator library.
    ; Default is "false".
    loademu = false
    ; Emulator library that is used for the stats
    ; and storage handling.
    ; Default is "emu.dll".
    emudll = emu.dll
    ; Use the emulator storage system.
    ; Default is "false".
    wrapperremotestorage = false
    ; Use the emulator stats/achievements system.
    ; Default is "false".
    wrapperuserstats = false
    ; Use the emulator utils system.
    ; Default is "false".
    wrapperutils = false
    ; User the emulator callbacks system.
    ; Default is "false".
    wrappercallbacks = false

    [dlc_subscription]
    ; This will check if the specifed
    ; DLC is owned by the user.
    ; Format: <dlc_id> = <true/false>
    ; e.g. : 12345 = true
    ;        12346 = true
    ;        12347 = true
    ; If the DLC is not specified in this section
    ; then it won't be subscribed.
    ; Also if the value is set to "false" the DLC
    ; won't be subscribed either.
    [dlcs]{dlc_id} = true\n[/dlcs]
    [dlc_index]
    ; DLC handling.
    ; Format: <dlc_index> = <dlc_id>
    ; e.g. : 0 = 12345
    ;        1 = 12346
    ;        2 = 12347
    [dlcs]{dlc_index} = {dlc_id}\n[/dlcs]
    [dlc_names]
    ; Names for the DLCs index put above.
    ; Use this only if needed.
    ; Format: <dlc_index> = <dlc_name>
    ; e.g. : 0 = DLC Name 0
    ;        1 = DLC Name 1
    ;        2 = DLC Name 2
    [dlcs]{dlc_index} = {dlc_name}\n[/dlcs]
    [dlc_timestamp]
    ; Specifies a unique unix timestamp for the purchased DLC (http://www.onlineconversion.com/unix_time.htm).
    ; By default returns the current date timestamp (if nothing was specified).
    ; Format: <dlc_id> = <timestamp>
    ; e.g. : 12345 = 1420070400`
                };
            },
            options: {}
        },

        // GREENLUMA BATCH MODE
        greenluma_batch_mode: {
            name: "GreenLuma Reborn v1.7.3 [BATCH MODE]",
            callback({
                info
            }, app) {
                // BATCH
                const batch = info.replace(/; /g, ":: ") + `@ECHO OFF
    TITLE ${app.steamDB.appIDName} - ${GM_info.script.name} by ${GM_info.script.author} v${GM_info.script.version}
    CLS

    :: WINDOWS WORKING DIR BUG WORKAROUND
    CD /D %~dp0

    :: CHECK APPLIST DIR
    IF EXIST .\\AppList\\NUL (
        RMDIR /S /Q .\\AppList\\
    )

    :: CREATE APPLIST DIR
    MKDIR .\\AppList\\
    :: CREATE DLCS FILES
    :: ${app.steamDB.appIDName}
    ECHO ${app.steamDB.appID}> .\\AppList\\0.txt
    ${app.dlcList(`:: {dlc_name}
    ECHO {dlc_id}> .\\AppList\\{dlc_index}.txt\n`, true)}
    :: OPTION START GREENLUMA REBORN
    IF EXIST .\\DLLInjector.exe GOTO :Q
    GOTO :EXIT

    :Q
    SET /P c=Do you want to start GreenLuma Reborn [Y/N]?
    IF /I "%c%" EQU "Y" GOTO :START
    IF /I "%c%" EQU "N" GOTO :EXIT
    GOTO :Q

    :START
    CLS
    ECHO Launching Greenluma Reborn | APPID ${app.steamDB.appID} | APPNAME ${app.steamDB.appIDName}
    TASKKILL /F /IM steam.exe
    TIMEOUT /T 2
    DLLInjector.exe -DisablePreferSystem32Images

    :EXIT
    EXIT`;
                // GENERATE
                app.classes.download.as(`${app.steamDB.appIDName}_AppList.bat`, batch);
            },
            options: {}
        },
        // LUMAEMU (ONLY DLCs LIST)
        lumaemu_only_dlcs: {
            name: "LUMAEMU v1.9.7 (ONLY DLCs LIST)",
            callback({
                info
            }, app) {
                return {
                    name: "LumaEmu_only_dlcs.ini",
                    data: "[dlcs]; {dlc_name}\nDLC_{dlc_id} = 1\n[/dlcs]"
                };
            },
            options: {}
        },
        // CODEX (DLC00000, DLCName)
        codex_t: {
            name: "CODEX (DLC00000 = DLCName)",
            callback({
                info
            }, app) {
                return {
                    name: "steam_emu.ini",
                    data: "[dlcs=false:5]DLC{dlc_index} = {dlc_id}\nDLCName{dlc_index} = {dlc_name}\n[/dlcs]"
                };
            },
            options: {}
        },
        // 3DMGAME
        "3dmgame": {
            name: "3DMGAME",
            callback({
                info
            }, app) {
                return {
                    name: "3DMGAME.ini",
                    data: "[dlcs=true:3]; {dlc_name}\nDLC{dlc_index} = {dlc_id}\n[/dlcs]"
                };
            },
            options: {}
        },
        // SKIDROW
        skidrow: {
            name: "SKIDROW",
            callback({
                info
            }, app) {
                return {
                    name: "steam_api.ini",
                    data: "[dlcs]; {dlc_name}\n{dlc_id}\n[/dlcs]"
                };
            },
            options: {}
        },
        // NORMALLY (ID = NAME)
        normally_id_name: {
            name: "ID = NAME",
            callback({
                info
            }, app) {
                return {
                    name: "dlcs_id_name.ini",
                    data: "[dlcs]{dlc_id} = {dlc_name}\n[/dlcs]"
                };
            },
            options: {}
        }*/
};
