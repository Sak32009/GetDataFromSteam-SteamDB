interface SteamCMDApiConfig {
  installdir: string;
}

interface SteamCMDApiCommon {
  name: string;
}

interface SteamCMDApiBranchPublic {
  buildid: string;
}

interface SteamCMDApiBranches {
  public: SteamCMDApiBranchPublic;
}

interface SteamCMDApiDepotManifests {
  public: string;
}

interface SteamCMDApiDepotConfig {
  oslist?: string;
}

interface SteamCMDApiDepot {
  name: string;
  maxsize: string;
  dlcappid?: string;
  depotfromapp?: string;
  sharedinstall?: number;
  config?: SteamCMDApiDepotConfig;
  manifests?: SteamCMDApiDepotManifests;
}

interface SteamCMDApiDepots {
  [depotid: number]: SteamCMDApiDepot;
  branches: SteamCMDApiBranches;
  baselanguages?: string;
}

interface SteamCMDApiAppId {
  common: SteamCMDApiCommon;
  config: SteamCMDApiConfig;
  depots: SteamCMDApiDepots;
}

interface SteamCMDApi {
  [appid: number]: SteamCMDApiAppId;
}

interface SteamCMDAcfSharedDepots {
  [depotid: number]: string;
}

interface SteamCMDAcfInstalledDepot {
  manifest: string;
  size: string;
  dlcappid?: string;
}

interface SteamCMDAcfInstalledDepots {
  [depotid: number]: SteamCMDAcfInstalledDepot;
}

interface SteamCMDAcfAppState {
  appid: number;
  Universe: number;
  LauncherPath: string;
  name: string;
  StateFlags: number;
  installdir: string;
  LastUpdated: number;
  SizeOnDisk: number;
  StagingSize: number;
  buildid: number;
  LastOwner: number;
  UpdateResult: number;
  BytesToDownload: number;
  BytesDownloaded: number;
  BytesToStage: number;
  BytesStaged: number;
  TargetBuildID: number;
  AutoUpdateBehavior: number;
  AllowOtherDownloadsWhileRunning: number;
  ScheduledAutoUpdate: number;
  /*
  "UserConfig"
	{
		"language"  "english"
	}
  */
  UserConfig?: Record<string, string>;
  /*
  "MountedConfig"
	{
		"language"  "english"
	}
  */
  MountedConfig?: Record<string, string>;
  /*
  "InstalledDepots"
  {
    "228986"
    {
      "manifest"  "1003373983685403880"
    }
  }
  */
  InstalledDepots?: SteamCMDAcfInstalledDepots;
  /*
  "SharedDepots"
  {
    "228990"  "228980"
    "229002"  "228980"
  }
  */
  SharedDepots?: SteamCMDAcfSharedDepots;
  /*
  "MountedDepots"
  {
    "228986"  "1003373983685403880"
  }
  */
  MountedDepots?: Record<string, string>;
  /*
  "InstallScripts"
  {
    "228986"  "_CommonRedist\vcredist\2015\installscript.vdf"
  }
  */
  InstallScripts?: Record<string, string>;
}

interface SteamCMDAcf {
  AppState: SteamCMDAcfAppState;
}
