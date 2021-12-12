export type Assets = {
  baseUrl: string;
  images:{ key:string, url:string }[];
};
export default {
  baseUrl: './assets/',
  images: [
    
    {
      key: 'gameBG',
      url: 'img/baseGame/Basegame_BG2.png',
    },
    {
      key: 'winBox',
      url: 'img/Winboxes/Winbox.png',
    },
    {
      key: 'reelBG',
      url: 'img/baseGame/Basegame_Reel.png',
    },
    {
      key: 'symbols',
      url: 'img/symbols/symbols.json', 
    },
    {
      key: 'symbolsBlur',
      url: 'img/symbols/symbols_blur.json', 
    },
    {
      key: 'gameLogo',
      url: 'img/baseGame/Logo.png', 
    },
    {
      key: 'commonUI',
      url: 'img/buttonPanel/Common_ui.json',
    },
   
    
    
  ],
};
