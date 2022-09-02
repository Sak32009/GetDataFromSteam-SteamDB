/* eslint-disable sonarjs/cognitive-complexity */
/**
 * IT IS SHARED BETWEEN
 * https://github.com/Sak32009/GetDLCInfoFromSteamDB
 * AND
 * https://github.com/Sak32009/SteamACFGenerator
 * VERSION: 1.0.3
 */
import { stringify as vdfStringify } from 'vdf-parser';
import acfConsole from './acf-console';

export const isNumeric = (str: string) => /^\d+$/u.test(str);

export const acfGenerator = (appId: number, steamCMDData: SteamCMDApi) => {
  const data = steamCMDData[appId];
  const appName = data.common.name;
  const appInstallDirectory = data.config.installdir;
  const appBuildId = data.depots.branches.public.buildid;
  // const appBaseLanguages = data.depots.baselanguages;
  const appInstalledDepots: SteamCMDAcfInstalledDepots = {};
  const appSharedDepots: SteamCMDAcfSharedDepots = {};
  let appSize = 0;

  acfConsole.debug('appName', appName);
  acfConsole.debug('appInstallDirectory', appInstallDirectory);
  acfConsole.debug('appBuildId', appBuildId);
  // acfConsole.debug('appBaseLanguages', appBaseLanguages);

  const appDataDepots = data.depots;
  for (const depotId in appDataDepots) {
    if (Object.prototype.hasOwnProperty.call(appDataDepots, depotId)) {
      if (isNumeric(depotId)) {
        const depotData = appDataDepots[depotId];
        const depotName = depotData.name;
        const depotSize = typeof depotData.maxsize !== 'undefined' ? depotData.maxsize : 0;
        const depotManifestId = typeof depotData.manifests !== 'undefined' ? depotData.manifests.public : undefined;
        const depotOs =
          typeof depotData.config !== 'undefined' && typeof depotData.config.oslist !== 'undefined'
            ? depotData.config.oslist
            : undefined;
        const depotIsDlc = typeof depotData.dlcappid !== 'undefined' ? depotData.dlcappid : undefined;
        const depotIsSharedInstall =
          typeof depotData.sharedinstall !== 'undefined' ? depotData.depotfromapp : undefined;

        acfConsole.debug(`-------------------------- depotId ${depotId}`);
        acfConsole.debug('depotName', depotName);
        acfConsole.debug('depotSize', depotSize);
        acfConsole.debug('depotManifestId', depotManifestId);
        acfConsole.debug('depotOs', depotOs);
        acfConsole.debug('depotIsDlc', depotIsDlc);
        acfConsole.debug('depotIsSharedInstall', depotIsSharedInstall);

        // ONLY WINDOWS
        if (typeof depotOs === 'undefined' || depotOs === 'windows') {
          if (typeof depotIsSharedInstall !== 'undefined') {
            appSharedDepots[depotId] = depotIsSharedInstall;
          } else if (typeof depotManifestId !== 'undefined') {
            // NOTE: first depot contains the game size
            if (appSize === 0) {
              appSize = depotSize;
              acfConsole.debug('appSize', appSize, '(it is normal if it is displayed after!)');
            }

            appInstalledDepots[depotId] =
              typeof depotIsDlc !== 'undefined'
                ? {
                    manifest: depotManifestId,
                    size: depotSize,
                    dlcappid: depotIsDlc,
                  }
                : {
                    manifest: depotManifestId,
                    size: depotSize,
                  };
          } else {
            acfConsole.info(`${depotId} it is an unused depot.`);
          }
        } else {
          acfConsole.info(`${depotId} it is not a valid depot for Windows OS.`);
        }
      } else {
        acfConsole.info(`${depotId} SKIP...`);
      }
    }
  }

  const appManifestOutput: SteamCMDAcf = {
    AppState: {
      appid: appId,
      Universe: 1,
      LauncherPath: '',
      name: appName,
      StateFlags: 4,
      installdir: appInstallDirectory,
      LastUpdated: 0,
      SizeOnDisk: appSize,
      StagingSize: 0,
      buildid: appBuildId,
      LastOwner: 2009,
      UpdateResult: 0,
      BytesToDownload: 0,
      BytesDownloaded: 0,
      BytesToStage: 0,
      BytesStaged: 0,
      TargetBuildID: 0,
      AutoUpdateBehavior: 0,
      AllowOtherDownloadsWhileRunning: 0,
      ScheduledAutoUpdate: 0,
    },
  };

  /*
  if (typeof appBaseLanguages !== 'undefined') {
    appManifestOutput.AppState.UserConfig!.language = appBaseLanguages
  }
  */

  if (Object.keys(appInstalledDepots).length > 0) {
    appManifestOutput.AppState.InstalledDepots = appInstalledDepots;
  }

  if (Object.keys(appSharedDepots).length > 0) {
    appManifestOutput.AppState.SharedDepots = appSharedDepots;
  }

  return vdfStringify(appManifestOutput, { pretty: true, indent: '\t' }).replaceAll('" "', '"\t\t"');
};
