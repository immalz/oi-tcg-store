export interface DigimonCardFull {
    name: string;
    type: string;
    id: string;                 // BT4-016, BT1-001, etc.
    level?: number;
    play_cost?: number;
    evolution_cost?: number;
    evolution_color?: string;
    evolution_level?: number;
    xros_req?: string;
    color?: string;
    color2?: string | null;
    digi_type?: string;
    digi_type2?: string | null;
    form?: string;
    dp?: number;
    attribute?: string;
    rarity?: string;
    stage?: string;
    artist?: string | null;
    main_effect?: string;
    source_effect?: string;
    alt_effect?: string;
    series?: string;
    pretty_url?: string;
    date_added?: string;
    tcgplayer_name?: string;
    tcgplayer_id?: number;
  
    // Campo agregado en tu script
    image_url: string;
  
    // Por si la API agrega cosas nuevas
    [key: string]: any;
  }
  