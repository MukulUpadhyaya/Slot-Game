import {
  
  ILoaderResource,
  Loader,
} from 'pixi.js';
import { setResources } from './Textures';
import { Assets } from './assets';
//import { loadingScreen} from './loadingScreen';

function addAssets(loader:Loader, assets: {key:string, url:string}[]):void {
  assets.forEach((asset) => {
    loader.add(asset);
  });
}
export type ResourceType = {[key:string]: ILoaderResource};
let progDiv: HTMLDivElement;
function showProgress(e: any) {
  if (progDiv === undefined) {
    progDiv = document.querySelector('.progress') as HTMLDivElement; 
    progDiv.className = 'progress';
  
  }
  
  progDiv.style.width = `${e.progress}%`;
}

function loadComplete(loader:Loader,resources: ResourceType,onCompleteCallback:(l:Loader, r: ResourceType)=>void): void {
    setResources(resources);
    
    setTimeout(()=>{
      (document.querySelector('#bar') as HTMLDivElement).style.visibility = 'hidden'
      const message = document.querySelector('#message') as HTMLDivElement
      message.innerHTML = "CLICK TO START"

      message.addEventListener('click',()=>{
        (document.querySelector('#preloader') as HTMLDivElement).style.display='none'
        onCompleteCallback(loader, resources);
      });
    },1000);
  }

export function preLoader(assetList: Assets,callback: (l?:Loader, r?: ResourceType) => void): Loader {
    const loader = Loader.shared;
    if (assetList.baseUrl) {
      loader.baseUrl = assetList.baseUrl;
    }
    addAssets(loader, assetList.images);
    loader.onProgress.add(showProgress);
    loader.onComplete.add((l:Loader, res) => {
     // console.warn('loader', l, 'res ', res);
      loadComplete( l, res as any, callback);
  });
  loader.load();
  console.log(loader)
  return loader;
}
