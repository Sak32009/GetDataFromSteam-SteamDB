interface SteamCMDApiConfig {
  installdir: string
}

interface SteamCMDApiCommon {
  name: string
}

interface SteamCMDApiBranchPublic {
  buildid: number
}

interface SteamCMDApiBranches {
  public: SteamCMDApiBranchPublic
}

interface SteamCMDApiDepotManifests {
  public: number
}

interface SteamCMDApiDepotConfig {
  oslist?: string
}

interface SteamCMDApiDepot {
  name: string
  maxsize?: number
  dlcappid?: number
  depotfromapp?: number
  sharedinstall?: number
  config?: SteamCMDApiDepotConfig
  manifests?: SteamCMDApiDepotManifests
}

interface SteamCMDApiDepots {
  [depotid: number]: SteamCMDApiDepot
  branches: SteamCMDApiBranches
  baselanguages?: string
}

interface SteamCMDApiAppId {
  common: SteamCMDApiCommon
  config: SteamCMDApiConfig
  depots: SteamCMDApiDepots
}

interface SteamCMDApi {
  [appid: number]: SteamCMDApiAppId
}

interface SteamCMDAcfSharedDepots {
  [depotid: number]: number
}

interface SteamCMDAcfInstalledDepot {
  manifest: number
  size: number
  dlcappid?: number
}

interface SteamCMDAcfInstalledDepots {
  [depotid: number]: SteamCMDAcfInstalledDepot
}

interface SteamCMDAcfAppState {
  appid: number
  Universe: number
  LauncherPath: string
  name: string
  StateFlags: number
  installdir: string
  LastUpdated: number
  SizeOnDisk: number
  StagingSize: number
  buildid: number
  LastOwner: number
  UpdateResult: number
  BytesToDownload: number
  BytesDownloaded: number
  BytesToStage: number
  BytesStaged: number
  TargetBuildID: number
  AutoUpdateBehavior: number
  AllowOtherDownloadsWhileRunning: number
  ScheduledAutoUpdate: number

  /*
  "UserConfig"
  {
    "language"  "english"
  }
  */
  UserConfig?: Record<string, string>
  /*
  "MountedConfig"
  {
    "language"  "english"
  }
  */
  MountedConfig?: Record<string, string>

  /*
  "InstalledDepots"
  {
    "228986"
    {
      "manifest"  "1003373983685403880"
    }
  }
  */
  InstalledDepots?: SteamCMDAcfInstalledDepots

  /*
  "SharedDepots"
  {
    "228990"  "228980"
    "229002"  "228980"
  }
  */
  SharedDepots?: SteamCMDAcfSharedDepots
  /*
  "MountedDepots"
  {
    "228986"  "1003373983685403880"
  }
  */
  MountedDepots?: Record<number, number>

  /*
  "InstallScripts"
  {
    "228986"  "_CommonRedist\vcredist\2015\installscript.vdf"
  }
  */
  InstallScripts?: Record<number, string>
}

interface SteamCMDAcf {
  AppState: SteamCMDAcfAppState
}
