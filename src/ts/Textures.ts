import {
  Texture, Resource,  ILoaderResource,
} from 'pixi.js';
import { ResourceType } from './PreLoader';
 type tTexture = {[key:string]: Texture<Resource>}

export let resources: {[key:string]: ILoaderResource };

export function getAllTexture(): tTexture{
  const keys = Object.keys(resources);
  const textures: tTexture = {} as tTexture;
  keys.forEach((key) => {
      if(resources[key].texture){
        textures[key] = resources[key].texture as Texture<Resource>;
      }
      else if(resources[key].textures){
        const atlkeys = Object.keys(resources[key].data.frames)
        atlkeys.forEach((akey:string) =>{
          textures[akey] = (resources[key].textures as  tTexture)[akey] as Texture<Resource>
        })

      }
  });

  return textures;
}

export function setResources(value: ResourceType) {
  resources = value;
  getAllTexture();
}

export function getResource(id: string): ILoaderResource {

  return resources[id];
}

export function getTexture(id:string): Texture<Resource>|null {
  const textures   = getAllTexture()

  if (id in textures) {
    return textures[id] as Texture<Resource>;
  }

  return null;
}

export function  getTextureFrame(textureId:string,frameId : string):Texture<Resource>|null {
  console.warn("sara",getAllTexture())
  if(textureId in resources){
    const res = resources[textureId]
    if(res.textures&&frameId in res.textures){
      return res.textures[frameId] as Texture;
    }
  }
  return null

}
