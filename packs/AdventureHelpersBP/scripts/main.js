import { system, world } from "@minecraft/server";
import { ActionFormData, MessageFormData } from "@minecraft/server-ui";

const HELPER_TAG = "ah_helper";
const WHISTLE_GRANTED_TAG = "ah_whistle_granted";
const MODE_TAGS = ["ah_mode_scout", "ah_mode_guard", "ah_mode_forager"];
const HOSTILE_MOBS = [
  "minecraft:zombie",
  "minecraft:husk",
  "minecraft:drowned",
  "minecraft:skeleton",
  "minecraft:stray",
  "minecraft:creeper",
  "minecraft:spider",
  "minecraft:cave_spider",
  "minecraft:enderman",
  "minecraft:witch",
  "minecraft:pillager",
  "minecraft:vindicator",
  "minecraft:evocation_illager",
  "minecraft:ravager",
  "minecraft:slime",
  "minecraft:magma_cube",
  "minecraft:piglin",
  "minecraft:piglin_brute",
  "minecraft:zombified_piglin",
  "minecraft:blaze",
  "minecraft:wither_skeleton",
  "minecraft:ghast",
  "minecraft:guardian",
  "minecraft:elder_guardian",
  "minecraft:silverfish",
  "minecraft:endermite",
  "minecraft:phantom"
];

const MONSTER_OPTIONS = [
  { label: "All Monsters", type: undefined, icon: "textures/items/iron_sword", message: "monsters" },
  { label: "Zombie", type: "minecraft:zombie", icon: "textures/items/rotten_flesh", message: "zombies" },
  { label: "Husk", type: "minecraft:husk", icon: "textures/items/rotten_flesh", message: "husks" },
  { label: "Drowned", type: "minecraft:drowned", icon: "textures/items/trident", message: "drowned" },
  { label: "Skeleton", type: "minecraft:skeleton", icon: "textures/items/bone", message: "skeletons" },
  { label: "Stray", type: "minecraft:stray", icon: "textures/items/arrow", message: "strays" },
  { label: "Creeper", type: "minecraft:creeper", icon: "textures/items/gunpowder", message: "creepers" },
  { label: "Spider", type: "minecraft:spider", icon: "textures/items/string", message: "spiders" },
  { label: "Enderman", type: "minecraft:enderman", icon: "textures/items/ender_pearl", message: "endermen" },
  { label: "Witch", type: "minecraft:witch", icon: "textures/items/potion_bottle_empty", message: "witches" },
  { label: "Pillager", type: "minecraft:pillager", icon: "textures/items/crossbow_standby", message: "pillagers" },
  { label: "Slime", type: "minecraft:slime", icon: "textures/items/slimeball", message: "slimes" },
  { label: "Phantom", type: "minecraft:phantom", icon: "textures/items/phantom_membrane", message: "phantoms" },
  { label: "Blaze", type: "minecraft:blaze", icon: "textures/items/blaze_rod", message: "blazes" },
  { label: "Wither Skeleton", type: "minecraft:wither_skeleton", icon: "textures/items/coal", message: "wither skeletons" }
];

const MONSTER_TYPES = MONSTER_OPTIONS.filter((monster) => monster.type).map((monster) => monster.type);

const ANIMAL_OPTIONS = [
  { label: "All Animals", type: undefined, icon: "textures/items/wheat", message: "animals" },
  { label: "Cow", type: "minecraft:cow", icon: "textures/items/leather", message: "cows" },
  { label: "Pig", type: "minecraft:pig", icon: "textures/items/porkchop_raw", message: "pigs" },
  { label: "Sheep", type: "minecraft:sheep", icon: "textures/blocks/wool_colored_white", message: "sheep" },
  { label: "Chicken", type: "minecraft:chicken", icon: "textures/items/egg", message: "chickens" },
  { label: "Horse", type: "minecraft:horse", icon: "textures/items/saddle", message: "horses" },
  { label: "Donkey", type: "minecraft:donkey", icon: "textures/items/chest_minecart", message: "donkeys" },
  { label: "Llama", type: "minecraft:llama", icon: "textures/items/carpet_white", message: "llamas" },
  { label: "Goat", type: "minecraft:goat", icon: "textures/items/goat_horn", message: "goats" },
  { label: "Wolf", type: "minecraft:wolf", icon: "textures/items/bone", message: "wolves" },
  { label: "Cat", type: "minecraft:cat", icon: "textures/items/fish_raw", message: "cats" },
  { label: "Fox", type: "minecraft:fox", icon: "textures/items/sweet_berries", message: "foxes" },
  { label: "Rabbit", type: "minecraft:rabbit", icon: "textures/items/rabbit", message: "rabbits" },
  { label: "Turtle", type: "minecraft:turtle", icon: "textures/items/turtle_helmet", message: "turtles" },
  { label: "Frog", type: "minecraft:frog", icon: "textures/items/slimeball", message: "frogs" },
  { label: "Bee", type: "minecraft:bee", icon: "textures/items/honeycomb", message: "bees" },
  { label: "Camel", type: "minecraft:camel", icon: "textures/items/saddle", message: "camels" },
  { label: "Panda", type: "minecraft:panda", icon: "textures/items/bamboo", message: "pandas" },
  { label: "Parrot", type: "minecraft:parrot", icon: "textures/items/feather", message: "parrots" }
];

const ANIMAL_TYPES = ANIMAL_OPTIONS.filter((animal) => animal.type).map((animal) => animal.type);
const ORE_IDS = new Set([
  "minecraft:coal_ore",
  "minecraft:deepslate_coal_ore",
  "minecraft:iron_ore",
  "minecraft:deepslate_iron_ore",
  "minecraft:copper_ore",
  "minecraft:deepslate_copper_ore",
  "minecraft:gold_ore",
  "minecraft:deepslate_gold_ore",
  "minecraft:redstone_ore",
  "minecraft:deepslate_redstone_ore",
  "minecraft:lapis_ore",
  "minecraft:deepslate_lapis_ore",
  "minecraft:diamond_ore",
  "minecraft:deepslate_diamond_ore",
  "minecraft:emerald_ore",
  "minecraft:deepslate_emerald_ore",
  "minecraft:nether_gold_ore",
  "minecraft:nether_quartz_ore",
  "minecraft:ancient_debris"
]);

const ORE_OPTIONS = [
  {
    label: "Nearby Ores",
    icon: "textures/blocks/iron_ore",
    ids: [...ORE_IDS],
    message: "nearby ores"
  },
  {
    label: "Coal Ore",
    icon: "textures/blocks/coal_ore",
    ids: ["minecraft:coal_ore", "minecraft:deepslate_coal_ore"],
    message: "coal ore"
  },
  {
    label: "Iron Ore",
    icon: "textures/blocks/iron_ore",
    ids: ["minecraft:iron_ore", "minecraft:deepslate_iron_ore"],
    message: "iron ore"
  },
  {
    label: "Copper Ore",
    icon: "textures/blocks/copper_ore",
    ids: ["minecraft:copper_ore", "minecraft:deepslate_copper_ore"],
    message: "copper ore"
  },
  {
    label: "Gold Ore",
    icon: "textures/blocks/gold_ore",
    ids: ["minecraft:gold_ore", "minecraft:deepslate_gold_ore", "minecraft:nether_gold_ore"],
    message: "gold ore"
  },
  {
    label: "Redstone Ore",
    icon: "textures/blocks/redstone_ore",
    ids: ["minecraft:redstone_ore", "minecraft:deepslate_redstone_ore"],
    message: "redstone ore"
  },
  {
    label: "Lapis Ore",
    icon: "textures/blocks/lapis_ore",
    ids: ["minecraft:lapis_ore", "minecraft:deepslate_lapis_ore"],
    message: "lapis ore"
  },
  {
    label: "Diamond Ore",
    icon: "textures/blocks/diamond_ore",
    ids: ["minecraft:diamond_ore", "minecraft:deepslate_diamond_ore"],
    message: "diamond ore"
  },
  {
    label: "Emerald Ore",
    icon: "textures/blocks/emerald_ore",
    ids: ["minecraft:emerald_ore", "minecraft:deepslate_emerald_ore"],
    message: "emerald ore"
  },
  {
    label: "Nether Quartz Ore",
    icon: "textures/blocks/quartz_ore",
    ids: ["minecraft:nether_quartz_ore"],
    message: "nether quartz ore"
  },
  {
    label: "Ancient Debris",
    icon: "textures/blocks/ancient_debris_side",
    ids: ["minecraft:ancient_debris"],
    message: "ancient debris"
  },
  {
    label: "Lava",
    icon: "textures/blocks/lava_still",
    ids: ["minecraft:lava", "minecraft:flowing_lava"],
    message: "lava"
  }
];

const ORE_SCAN_RANGES = [
  {
    label: "Nearby",
    radius: 20,
    vertical: 16,
    description: "20 blocks out, 16 up/down"
  },
  {
    label: "Wide",
    radius: 100,
    vertical: 32,
    description: "100 blocks out, 32 up/down"
  },
  {
    label: "Long",
    radius: 200,
    vertical: 48,
    description: "200 blocks out, 48 up/down"
  }
];

const QUESTS = [
  {
    title: "Mine 100 blocks",
    key: "ah_blocks_mined",
    target: 100,
    reward: "give @s iron_ingot 8",
    rewardLabel: "8 Iron Ingots"
  },
  {
    title: "Defeat 25 hostile mobs",
    key: "ah_mobs_defeated",
    target: 25,
    reward: "give @s diamond 1",
    rewardLabel: "1 Diamond"
  },
  {
    title: "Harvest 20 crops",
    key: "ah_crops_harvested",
    target: 20,
    reward: "give @s bread 12",
    rewardLabel: "12 Bread"
  },
  {
    title: "Request 5 deliveries",
    key: "ah_item_requests",
    target: 5,
    reward: "give @s emerald 2",
    rewardLabel: "2 Emeralds"
  },
  {
    title: "Find ore 3 times",
    key: "ah_ore_scans_found",
    target: 3,
    reward: "give @s torch 32",
    rewardLabel: "32 Torches"
  },
  {
    title: "Scout 10 animals",
    key: "ah_animals_found",
    target: 10,
    reward: "give @s wheat 16",
    rewardLabel: "16 Wheat"
  },
  {
    title: "Change mode 3 times",
    key: "ah_mode_changes",
    target: 3,
    reward: "give @s cooked_beef 8",
    rewardLabel: "8 Steak"
  }
];

const DIM_KEYS = {
  "minecraft:overworld": "o",
  "minecraft:nether": "n",
  "minecraft:the_end": "e"
};

const KEY_DIMS = {
  o: "minecraft:overworld",
  n: "minecraft:nether",
  e: "minecraft:the_end"
};

const REQUEST_ITEMS = [
  { label: "Dirt", id: "minecraft:dirt", icon: "textures/blocks/dirt" },
  { label: "Stone", id: "minecraft:stone", icon: "textures/blocks/stone" },
  { label: "Cobblestone", id: "minecraft:cobblestone", icon: "textures/blocks/cobblestone" },
  { label: "Oak Planks", id: "minecraft:oak_planks", icon: "textures/blocks/planks_oak" },
  { label: "Sand", id: "minecraft:sand", icon: "textures/blocks/sand" },
  { label: "Gravel", id: "minecraft:gravel", icon: "textures/blocks/gravel" },
  { label: "Glass", id: "minecraft:glass", icon: "textures/blocks/glass" },
  { label: "Torch", id: "minecraft:torch", icon: "textures/blocks/torch_on" },
  { label: "Coal", id: "minecraft:coal", icon: "textures/items/coal" },
  { label: "Flint", id: "minecraft:flint", icon: "textures/items/flint" },
  { label: "Copper Ingot", id: "minecraft:copper_ingot", icon: "textures/items/copper_ingot" },
  { label: "Iron Ingot", id: "minecraft:iron_ingot", icon: "textures/items/iron_ingot" },
  { label: "Gold Ingot", id: "minecraft:gold_ingot", icon: "textures/items/gold_ingot" },
  { label: "Redstone Dust", id: "minecraft:redstone", icon: "textures/items/redstone_dust" },
  { label: "Lapis Lazuli", id: "minecraft:lapis_lazuli", icon: "textures/items/dye_powder_blue" },
  { label: "Wheat Seeds", id: "minecraft:wheat_seeds", icon: "textures/items/seeds_wheat" },
  { label: "Bone Meal", id: "minecraft:bone_meal", icon: "textures/items/dye_powder_white" },
  { label: "Bread", id: "minecraft:bread", icon: "textures/items/bread" }
];

const BACK_ICON = "textures/ui/arrow_left";
const SCAN_BATCH_SIZE = 12000;
let requestSequence = 0;

const MODE_OPTIONS = [
  {
    label: "Scout",
    tag: "ah_mode_scout",
    icon: "textures/items/compass_item",
    description: "Haste buff, ore scans, and navigation help."
  },
  {
    label: "Guard",
    tag: "ah_mode_guard",
    icon: "textures/items/shield",
    description: "Resistance buff and combat-oriented support."
  },
  {
    label: "Forager",
    tag: "ah_mode_forager",
    icon: "textures/items/wheat",
    description: "Saturation buff, farming support, and supplies."
  }
];

const STRUCTURE_OPTIONS = [
  { label: "Village", id: "village", icon: "textures/blocks/planks_oak" },
  { label: "Mineshaft", id: "mineshaft", icon: "textures/blocks/rail_normal" },
  { label: "Stronghold", id: "stronghold", icon: "textures/items/ender_eye" },
  { label: "Ancient City", id: "ancient_city", icon: "textures/blocks/sculk" },
  { label: "Ocean Monument", id: "monument", icon: "textures/blocks/prismarine_dark" },
  { label: "Woodland Mansion", id: "mansion", icon: "textures/blocks/log_oak" },
  { label: "Desert Pyramid", id: "desert_pyramid", icon: "textures/blocks/sandstone_normal" },
  { label: "Jungle Temple", id: "jungle_pyramid", icon: "textures/blocks/cobblestone_mossy" },
  { label: "Pillager Outpost", id: "pillager_outpost", icon: "textures/items/crossbow_standby" },
  { label: "Ruined Portal", id: "ruined_portal", icon: "textures/blocks/obsidian" },
  { label: "Nether Fortress", id: "fortress", icon: "textures/blocks/nether_brick" },
  { label: "Bastion Remnant", id: "bastion_remnant", icon: "textures/blocks/blackstone" },
  { label: "End City", id: "end_city", icon: "textures/blocks/purpur_block" }
];

world.beforeEvents.itemUse.subscribe((event) => {
  if (event.itemStack?.typeId !== "ah:helper_whistle") return;
  system.run(() => spawnOrCallHelper(event.source));
});

world.beforeEvents.playerInteractWithEntity.subscribe((event) => {
  const player = event.player;
  const entity = event.target;
  if (!entity?.hasTag(HELPER_TAG)) return;
  if (!entity.hasTag(ownerTag(player))) {
    player.sendMessage("This helper is bonded to another player.");
    return;
  }
  system.run(() => showHelperMenu(player, entity));
});

world.afterEvents.playerBreakBlock.subscribe((event) => {
  incrementMetric(event.player, "ah_blocks_mined", 1);
});

world.afterEvents.playerSpawn.subscribe((event) => {
  const player = event.player;
  if (!event.initialSpawn || player.hasTag(WHISTLE_GRANTED_TAG)) return;
  player.addTag(WHISTLE_GRANTED_TAG);
  system.runTimeout(() => {
    player.runCommandAsync("give @s ah:helper_whistle 1").catch(() => {});
    player.sendMessage("Adventure Helpers gave you a Helper Whistle.");
  }, 20);
});

world.afterEvents.entityDie.subscribe((event) => {
  const dead = event.deadEntity;
  const killer = event.damageSource?.damagingEntity;

  if (killer?.typeId === "minecraft:player" && dead?.typeId !== "minecraft:player") {
    incrementMetric(killer, "ah_mobs_defeated", 1);
  }

  if (dead?.typeId === "minecraft:player") {
    try {
      setLocationTag(dead, "ah_death", dead.location, dead.dimension.id);
    } catch {
      // Some versions invalidate the player entity immediately during death.
    }
  }
});

system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const helper = findHelper(player);
    if (!helper) continue;
    keepHelperNearPlayer(player, helper);
    applyModeBuff(player, helper);
  }
}, 5);

system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const helper = findHelper(player);
    if (!helper || getMode(helper) !== "guard") continue;
    guardPlayer(player, helper);
  }
}, 20);

function spawnOrCallHelper(player) {
  let helper = findHelper(player);
  if (!helper) {
    helper = player.dimension.spawnEntity("minecraft:allay", offset(player.location, 1.5, 0.25, 1.5));
    helper.addTag(HELPER_TAG);
    helper.addTag(ownerTag(player));
    helper.addTag("ah_mode_scout");
    helper.nameTag = `${player.name}'s Helper`;
    player.sendMessage("Your helper has joined the adventure.");
  } else {
    const helperDistance = helper.dimension.id === player.dimension.id ? distance(player.location, helper.location) : 999;
    if (helperDistance <= 6) {
      showHelperMenu(player, helper);
    } else {
      helper.teleport(followTargetLocation(player), {
        dimension: player.dimension,
        rotation: player.getRotation()
      });
      player.sendMessage("Your helper returns to your side.");
    }
  }
}

function findHelper(player) {
  const tag = ownerTag(player);
  for (const dimensionId of Object.values(KEY_DIMS)) {
    const dimension = world.getDimension(dimensionId);
    const matches = dimension.getEntities({ tags: [HELPER_TAG, tag] });
    if (matches.length > 0) return matches[0];
  }
  return undefined;
}

function keepHelperNearPlayer(player, helper) {
  const target = followTargetLocation(player);
  if (helper.dimension.id !== player.dimension.id) {
    helper.teleport(target, { dimension: player.dimension, rotation: player.getRotation() });
    return;
  }

  const helperDistance = distance(target, helper.location);
  if (helperDistance > 24) {
    helper.teleport(target, { dimension: player.dimension, rotation: player.getRotation() });
    return;
  }

  if (helperDistance > 2.4) {
    helper.teleport(lerpLocation(helper.location, target, 0.35), {
      dimension: player.dimension,
      rotation: player.getRotation()
    });
  }
}

function applyModeBuff(player, helper) {
  const mode = getMode(helper);
  try {
    if (mode === "scout") player.addEffect("haste", 80, { amplifier: 0, showParticles: false });
    if (mode === "guard") {
      player.addEffect("resistance", 80, { amplifier: 1, showParticles: false });
      player.addEffect("regeneration", 60, { amplifier: 0, showParticles: false });
    }
    if (mode === "forager") player.addEffect("saturation", 20, { amplifier: 0, showParticles: false });
  } catch {
    // Effect identifiers can vary between experimental/stable Script API builds.
  }
}

function guardPlayer(player, helper) {
  const guardRange = 9;
  const attackRange = 6;
  const helperLoc = floorLocation(helper.location);
  let targetsFound = 0;

  for (const typeId of HOSTILE_MOBS) {
    const nearby = player.dimension.getEntities({
      type: typeId,
      location: player.location,
      maxDistance: guardRange
    });

    for (const mob of nearby.slice(0, 3)) {
      targetsFound++;
      try {
        mob.addEffect("slowness", 50, { amplifier: 1, showParticles: true });
        mob.addEffect("weakness", 50, { amplifier: 1, showParticles: true });
        mob.applyDamage(4, { damagingEntity: helper });
      } catch {
        const loc = floorLocation(mob.location);
        player.dimension.runCommandAsync(`effect @e[type=${typeId},x=${loc.x},y=${loc.y},z=${loc.z},r=2,c=1] slowness 3 1 true`).catch(() => {});
        player.dimension.runCommandAsync(`effect @e[type=${typeId},x=${loc.x},y=${loc.y},z=${loc.z},r=2,c=1] weakness 3 1 true`).catch(() => {});
      }
    }
  }

  if (targetsFound > 0) {
    player.dimension.runCommandAsync(`particle minecraft:critical_hit_emitter ${helperLoc.x + 0.5} ${helperLoc.y + 0.8} ${helperLoc.z + 0.5}`).catch(() => {});
    helper.teleport(followTargetLocation(player), {
      dimension: player.dimension,
      rotation: player.getRotation()
    });
    if (!helper.hasTag("ah_guard_engaged")) {
      helper.addTag("ah_guard_engaged");
      player.sendMessage("Guard engaged nearby hostile mobs.");
    }
  } else if (helper.hasTag("ah_guard_engaged")) {
    helper.removeTag("ah_guard_engaged");
  }
}

async function showHelperMenu(player, helper) {
  const mode = getMode(helper);
  const form = new ActionFormData()
    .title("Adventure Helper")
    .body(`Mode: ${capitalize(mode)}\nChoose a helper action.`)
    .button("Quest List")
    .button("Change Mode")
    .button("Show Nearby Ores")
    .button("Find Animals")
    .button("Find Monsters")
    .button("Set Home")
    .button("Teleport Home")
    .button("Death Recall")
    .button("Request Items")
    .button("Auto Farm")
    .button("Structure Locator")
    .button("Launch Jump");

  const result = await form.show(player);
  if (result.canceled) return;

  switch (result.selection) {
    case 0:
      return showQuestList(player, helper);
    case 1:
      return showModeMenu(player, helper);
    case 2:
      return showNearbyOres(player, helper);
    case 3:
      return showAnimalMenu(player, helper);
    case 4:
      return showMonsterMenu(player, helper);
    case 5:
      return setHome(player);
    case 6:
      return teleportToSavedLocation(player, "ah_home", "home");
    case 7:
      return teleportToSavedLocation(player, "ah_death", "death point");
    case 8:
      return requestItems(player, helper);
    case 9:
      return autoFarm(player);
    case 10:
      return showStructureMenu(player, helper);
    case 11:
      return launchJump(player);
  }
}

function showQuestList(player, helper) {
  const lines = QUESTS.map((quest) => {
    const current = getMetric(player, quest.key);
    const capped = Math.min(current, quest.target);
    return `${rewardLine(current >= quest.target, quest.title)}: ${capped}/${quest.target} -> ${quest.rewardLabel}`;
  });
  const ready = QUESTS.filter((quest) => getMetric(player, quest.key) >= quest.target);
  const form = new MessageFormData()
    .title("Quest List")
    .body(lines.join("\n"))
    .button1(ready.length > 0 ? `Claim ${ready.length} Reward${ready.length === 1 ? "" : "s"}` : "No Rewards Ready")
    .button2("Back");

  form.show(player).then((result) => {
    if (result.selection !== 0) {
      showHelperMenu(player, helper);
      return;
    }
    claimReadyQuests(player);
  });
}

function claimReadyQuests(player) {
  let claimed = 0;
  for (const quest of QUESTS) {
    const current = getMetric(player, quest.key);
    if (current < quest.target) continue;
    player.runCommandAsync(quest.reward).catch(() => {});
    setMetric(player, quest.key, current - quest.target);
    claimed++;
  }

  if (claimed === 0) {
    player.sendMessage("No quest rewards are ready yet.");
  } else {
    player.sendMessage(`Claimed ${claimed} quest reward${claimed === 1 ? "" : "s"}. Extra progress rolled over.`);
  }
}

async function showModeMenu(player, helper) {
  const current = getMode(helper);
  const form = new ActionFormData()
    .title("Helper Mode")
    .body(`Current mode: ${capitalize(current)}\nChoose the helper role you want.`);

  for (const mode of MODE_OPTIONS) {
    form.button(`${mode.label}\n${mode.description}`, mode.icon);
  }
  form.button("Back", BACK_ICON);

  const result = await form.show(player);
  if (result.canceled) return;
  if (result.selection === MODE_OPTIONS.length) return showHelperMenu(player, helper);

  const selected = MODE_OPTIONS[Number(result.selection) ?? 0] ?? MODE_OPTIONS[0];
  for (const tag of MODE_TAGS) helper.removeTag(tag);
  helper.addTag(selected.tag);
  incrementMetric(player, "ah_mode_changes", 1);
  player.sendMessage(`Helper mode changed to ${selected.label}.`);
  return showHelperMenu(player, helper);
}

async function showNearbyOres(player, helper) {
  const form = new ActionFormData()
    .title("Ore Finder")
    .body("Choose an ore family first, then choose how far your helper should scan.");

  for (const ore of ORE_OPTIONS) {
    form.button(`  ${ore.label}`, ore.icon);
  }
  form.button("Back", BACK_ICON);

  const result = await form.show(player);
  if (result.canceled) return;
  if (result.selection === ORE_OPTIONS.length) return showHelperMenu(player, helper);

  const selected = ORE_OPTIONS[Number(result.selection) ?? 0] ?? ORE_OPTIONS[0];
  return showOreRangeMenu(player, helper, selected);
}

async function showOreRangeMenu(player, helper, selected) {
  const form = new ActionFormData()
    .title(selected.label)
    .body("Longer scans may take a little while and only check loaded chunks.");

  for (const range of ORE_SCAN_RANGES) {
    form.button(`${range.label}\n${range.description}`, selected.icon);
  }
  form.button("Back", BACK_ICON);

  const result = await form.show(player);
  if (result.canceled) return;
  if (result.selection === ORE_SCAN_RANGES.length) return showNearbyOres(player, helper);

  const range = ORE_SCAN_RANGES[Number(result.selection) ?? 0] ?? ORE_SCAN_RANGES[0];
  scanForOres(player, selected, range);
}

function scanForOres(player, selected, range) {
  const center = floorLocation(player.location);
  const found = [];
  const selectedIds = new Set(selected.ids);
  const iterator = oreScanPositions(center, range.radius, range.vertical);
  let ticks = 0;
  player.sendMessage(`Scout started a ${range.label.toLowerCase()} scan for ${selected.message}.`);

  const runId = system.runInterval(() => {
    let checked = 0;
    while (checked < SCAN_BATCH_SIZE) {
      const next = iterator.next();
      if (next.done) {
        system.clearRun(runId);
        reportOreScan(player, selected, range, found);
        return;
      }

      checked++;
      const location = next.value;
      let block;
      try {
        block = player.dimension.getBlock(location);
      } catch {
        continue;
      }
      if (!block || !selectedIds.has(block.typeId)) continue;
      found.push({ typeId: block.typeId, ...location, distance: distance(center, location) });
    }

    ticks++;
    if (found.length >= 8 && ticks > 1) {
      system.clearRun(runId);
      reportOreScan(player, selected, range, found);
      return;
    }
    if (ticks % 40 === 0) player.sendMessage(`Scout is still scanning for ${selected.message}...`);
  }, 1);
}

function reportOreScan(player, selected, range, found) {
  found.sort((a, b) => a.distance - b.distance);
  const nearest = found.slice(0, 8);
  for (const ore of nearest) {
    player.dimension.runCommandAsync(`particle minecraft:endrod ${ore.x + 0.5} ${ore.y + 0.5} ${ore.z + 0.5}`).catch(() => {});
  }

  if (nearest.length === 0) {
    player.sendMessage(`Scout found no ${selected.message} within ${range.radius} blocks.`);
    return;
  }

  incrementMetric(player, "ah_ore_scans_found", 1);
  player.sendMessage(`Scout found ${found.length} ${selected.message} blocks within ${range.radius} blocks. Nearest:`);
  for (const ore of nearest.slice(0, 5)) {
    player.sendMessage(`- ${shortBlockName(ore.typeId)} at ${ore.x}, ${ore.y}, ${ore.z}`);
  }
}

async function showAnimalMenu(player, helper) {
  const form = new ActionFormData()
    .title("Animal Finder")
    .body("Scan nearby loaded areas for passive animals.");

  for (const animal of ANIMAL_OPTIONS) {
    form.button(`  ${animal.label}`, animal.icon);
  }
  form.button("Back", BACK_ICON);

  const result = await form.show(player);
  if (result.canceled) return;
  if (result.selection === ANIMAL_OPTIONS.length) return showHelperMenu(player, helper);

  const selected = ANIMAL_OPTIONS[Number(result.selection) ?? 0] ?? ANIMAL_OPTIONS[0];
  findAnimals(player, selected);
}

function findAnimals(player, selected) {
  const horizontalRange = 100;
  const verticalRange = 10;
  const found = [];
  const types = selected.type ? [selected.type] : ANIMAL_TYPES;

  for (const type of types) {
    const entities = player.dimension.getEntities({
      type,
      location: player.location,
      maxDistance: horizontalRange
    });

    for (const entity of entities) {
      const horizontalDistance = flatDistance(player.location, entity.location);
      if (horizontalDistance > horizontalRange || Math.abs(entity.location.y - player.location.y) > verticalRange) continue;
      found.push({
        typeId: entity.typeId,
        location: floorLocation(entity.location),
        distance: horizontalDistance
      });
    }
  }

  found.sort((a, b) => a.distance - b.distance);
  const nearest = found.slice(0, 8);

  if (nearest.length === 0) {
    player.sendMessage(`Scout found no ${selected.message} within ${horizontalRange} blocks and ${verticalRange} blocks up/down.`);
    return;
  }

  incrementMetric(player, "ah_animals_found", found.length);
  player.sendMessage(`Scout found ${found.length} ${selected.message} within ${horizontalRange} blocks and ${verticalRange} blocks up/down. Nearest:`);
  for (const animal of nearest.slice(0, 5)) {
    const loc = animal.location;
    player.sendMessage(`- ${shortMobName(animal.typeId)} at ${loc.x}, ${loc.y}, ${loc.z}`);
    player.dimension.runCommandAsync(`particle minecraft:villager_happy ${loc.x + 0.5} ${loc.y + 1} ${loc.z + 0.5}`).catch(() => {});
  }
}

async function showMonsterMenu(player, helper) {
  const form = new ActionFormData()
    .title("Monster Finder")
    .body("Scan nearby loaded areas for hostile mobs.");

  for (const monster of MONSTER_OPTIONS) {
    form.button(`  ${monster.label}`, monster.icon);
  }
  form.button("Back", BACK_ICON);

  const result = await form.show(player);
  if (result.canceled) return;
  if (result.selection === MONSTER_OPTIONS.length) return showHelperMenu(player, helper);

  const selected = MONSTER_OPTIONS[Number(result.selection) ?? 0] ?? MONSTER_OPTIONS[0];
  findMonsters(player, selected);
}

function findMonsters(player, selected) {
  const horizontalRange = 100;
  const verticalRange = 32;
  const found = [];
  const types = selected.type ? [selected.type] : MONSTER_TYPES;

  for (const type of types) {
    const entities = player.dimension.getEntities({
      type,
      location: player.location,
      maxDistance: horizontalRange
    });

    for (const entity of entities) {
      const horizontalDistance = flatDistance(player.location, entity.location);
      if (horizontalDistance > horizontalRange || Math.abs(entity.location.y - player.location.y) > verticalRange) continue;
      found.push({
        typeId: entity.typeId,
        location: floorLocation(entity.location),
        distance: horizontalDistance
      });
    }
  }

  found.sort((a, b) => a.distance - b.distance);
  const nearest = found.slice(0, 8);

  if (nearest.length === 0) {
    player.sendMessage(`Scout found no ${selected.message} within ${horizontalRange} blocks and ${verticalRange} blocks up/down.`);
    return;
  }

  player.sendMessage(`Scout found ${found.length} ${selected.message} within ${horizontalRange} blocks and ${verticalRange} blocks up/down. Nearest:`);
  for (const monster of nearest.slice(0, 5)) {
    const loc = monster.location;
    player.sendMessage(`- ${shortMobName(monster.typeId)} at ${loc.x}, ${loc.y}, ${loc.z}`);
    player.dimension.runCommandAsync(`particle minecraft:critical_hit_emitter ${loc.x + 0.5} ${loc.y + 1} ${loc.z + 0.5}`).catch(() => {});
  }
}

function setHome(player) {
  setLocationTag(player, "ah_home", player.location, player.dimension.id);
  const loc = floorLocation(player.location);
  player.sendMessage(`Home set at ${loc.x}, ${loc.y}, ${loc.z}.`);
}

function teleportToSavedLocation(player, prefix, label) {
  const saved = getLocationTag(player, prefix);
  if (!saved) {
    player.sendMessage(`No ${label} saved yet.`);
    return;
  }
  const dimension = world.getDimension(saved.dimensionId);
  player.teleport(saved.location, { dimension });
  player.sendMessage(`Teleported to ${label}.`);
}

async function requestItems(player, helper) {
  const list = new ActionFormData()
    .title("Request Items")
    .body("Choose what your helper should bring.");

  for (const item of REQUEST_ITEMS) {
    list.button(`  ${item.label}`, item.icon);
  }
  list.button("Back", BACK_ICON);

  const itemResult = await list.show(player);
  if (itemResult.canceled) return;
  if (itemResult.selection === REQUEST_ITEMS.length) return showHelperMenu(player, helper);

  const selected = REQUEST_ITEMS[Number(itemResult.selection) ?? 0] ?? REQUEST_ITEMS[0];
  return showQuantityMenu(player, helper, selected);
}

async function showQuantityMenu(player, helper, selected) {
  const amounts = [1, 8, 16, 32, 64];
  const form = new ActionFormData()
    .title(selected.label)
    .body("Choose quantity.");

  for (const amount of amounts) {
    form.button(`${amount}`, selected.icon);
  }
  form.button("Back", BACK_ICON);

  const result = await form.show(player);
  if (result.canceled) return;
  if (result.selection === amounts.length) return requestItems(player, helper);

  const quantity = amounts[Number(result.selection) ?? 0] ?? 1;
  queueItemRequest(player, selected, quantity);
  return requestItems(player, helper);
}

function queueItemRequest(player, selected, quantity) {
  const seconds = requestDelaySeconds(quantity);
  const requestId = ++requestSequence;
  const playerName = player.name;

  incrementMetric(player, "ah_item_requests", 1);
  player.sendMessage(`Request #${requestId}: ${quantity} ${selected.label} will arrive in about ${formatDelay(seconds)}.`);
  deliverQueuedItem(playerName, selected, quantity, requestId, seconds);
}

function deliverQueuedItem(playerName, selected, quantity, requestId, seconds) {
  system.runTimeout(() => {
    const player = world.getPlayers().find((candidate) => candidate.name === playerName);
    if (!player) {
      deliverQueuedItem(playerName, selected, quantity, requestId, 30);
      return;
    }

    player.runCommandAsync(`give @s ${selected.id} ${quantity}`).then(() => {
      player.sendMessage(`Request #${requestId} delivered: ${quantity} ${selected.label}.`);
    }).catch(() => {
      player.sendMessage(`Request #${requestId} failed: ${selected.label} could not be delivered.`);
    });
  }, Math.max(1, Math.floor(seconds * 20)));
}

function requestDelaySeconds(quantity) {
  const scale = Math.max(0, Math.min(1, (quantity - 1) / 63));
  const min = 30 + Math.floor(scale * 60);
  const max = 60 + Math.floor(scale * 120);
  return randomInt(min, max);
}

function formatDelay(seconds) {
  if (seconds < 60) return `${seconds} seconds`;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return rest === 0 ? `${minutes} minute${minutes === 1 ? "" : "s"}` : `${minutes}m ${rest}s`;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function autoFarm(player) {
  const center = floorLocation(player.location);
  const cropIds = new Set(["minecraft:wheat", "minecraft:carrots", "minecraft:potatoes", "minecraft:beetroot"]);
  let harvested = 0;

  for (let x = center.x - 4; x <= center.x + 4; x++) {
    for (let y = center.y - 1; y <= center.y + 1; y++) {
      for (let z = center.z - 4; z <= center.z + 4; z++) {
        const block = player.dimension.getBlock({ x, y, z });
        if (!block || !cropIds.has(block.typeId)) continue;
        const growth = block.permutation.getState("growth");
        if (typeof growth === "number" && growth < 7) continue;
        player.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air destroy`).catch(() => {});
        harvested++;
      }
    }
  }

  if (harvested > 0) {
    incrementMetric(player, "ah_crops_harvested", harvested);
    player.sendMessage(`Forager harvested ${harvested} mature crops.`);
  } else {
    player.sendMessage("Forager found no mature crops nearby.");
  }
}

async function showStructureMenu(player, helper) {
  const form = new ActionFormData()
    .title("Structure Locator")
    .body("Choose the structure your helper should look for.");

  for (const structure of STRUCTURE_OPTIONS) {
    form.button(`  ${structure.label}`, structure.icon);
  }
  form.button("Back", BACK_ICON);

  const result = await form.show(player);
  if (result.canceled) return;
  if (result.selection === STRUCTURE_OPTIONS.length) return showHelperMenu(player, helper);

  const selected = STRUCTURE_OPTIONS[Number(result.selection) ?? 0] ?? STRUCTURE_OPTIONS[0];
  locateStructure(player, selected);
}

function locateStructure(player, selected) {
  player.sendMessage(`Structure locator running for nearest ${selected.label}.`);
  player.runCommandAsync(`locate structure ${selected.id}`).catch(() => {
    player.sendMessage("This Minecraft version may use a different locate command syntax.");
  });
}

function launchJump(player) {
  try {
    player.addEffect("jump_boost", 120, { amplifier: 4, showParticles: true });
    player.addEffect("slow_falling", 160, { amplifier: 0, showParticles: true });
    player.sendMessage("Launch boost ready.");
  } catch {
    player.runCommandAsync("effect @s jump_boost 6 4 true").catch(() => {});
    player.runCommandAsync("effect @s slow_falling 8 0 true").catch(() => {});
  }
}

function ownerTag(player) {
  return `ah_owner_${player.name.replace(/[^A-Za-z0-9_-]/g, "_")}`;
}

function getMode(helper) {
  if (helper.hasTag("ah_mode_guard")) return "guard";
  if (helper.hasTag("ah_mode_forager")) return "forager";
  return "scout";
}

function setLocationTag(entity, prefix, location, dimensionId) {
  for (const tag of entity.getTags()) {
    if (tag.startsWith(`${prefix}_`)) entity.removeTag(tag);
  }
  const loc = floorLocation(location);
  const dim = DIM_KEYS[dimensionId] ?? "o";
  entity.addTag(`${prefix}_${dim}_${loc.x}_${loc.y}_${loc.z}`);
}

function getLocationTag(entity, prefix) {
  const tag = entity.getTags().find((candidate) => candidate.startsWith(`${prefix}_`));
  if (!tag) return undefined;
  const [dim, x, y, z] = tag.slice(prefix.length + 1).split("_");
  return {
    dimensionId: KEY_DIMS[dim] ?? "minecraft:overworld",
    location: { x: Number(x) + 0.5, y: Number(y), z: Number(z) + 0.5 }
  };
}

function incrementMetric(player, key, amount) {
  try {
    const current = Number(player.getDynamicProperty(key) ?? 0);
    player.setDynamicProperty(key, current + amount);
  } catch {
    // Metrics are optional; the core companion features should still work if disabled.
  }
}

function setMetric(player, key, value) {
  try {
    player.setDynamicProperty(key, Math.max(0, value));
  } catch {
    // Metrics are optional; the core companion features should still work if disabled.
  }
}

function getMetric(player, key) {
  try {
    return Number(player.getDynamicProperty(key) ?? 0);
  } catch {
    return 0;
  }
}

function floorLocation(location) {
  return {
    x: Math.floor(location.x),
    y: Math.floor(location.y),
    z: Math.floor(location.z)
  };
}

function offset(location, x, y, z) {
  return {
    x: location.x + x,
    y: location.y + y,
    z: location.z + z
  };
}

function followTargetLocation(player) {
  const yaw = (player.getRotation().y * Math.PI) / 180;
  const behind = {
    x: -Math.sin(yaw) * 1.6,
    z: Math.cos(yaw) * 1.6
  };
  const side = {
    x: Math.cos(yaw) * 0.75,
    z: Math.sin(yaw) * 0.75
  };
  return {
    x: player.location.x + behind.x + side.x,
    y: player.location.y + 1.15,
    z: player.location.z + behind.z + side.z
  };
}

function lerpLocation(from, to, amount) {
  return {
    x: from.x + (to.x - from.x) * amount,
    y: from.y + (to.y - from.y) * amount,
    z: from.z + (to.z - from.z) * amount
  };
}

function* oreScanPositions(center, radius, vertical) {
  for (let ring = 0; ring <= radius; ring++) {
    for (let dx = -ring; dx <= ring; dx++) {
      for (let dz = -ring; dz <= ring; dz++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== ring) continue;
        for (let y = center.y - vertical; y <= center.y + vertical; y++) {
          yield {
            x: center.x + dx,
            y,
            z: center.z + dz
          };
        }
      }
    }
  }
}

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function flatDistance(a, b) {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dz * dz);
}

function capitalize(value) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}

function shortBlockName(typeId) {
  return typeId.replace("minecraft:", "").replace(/_/g, " ");
}

function shortMobName(typeId) {
  return typeId.replace("minecraft:", "").replace(/_/g, " ");
}

function rewardLine(done, label) {
  return `${done ? "[x]" : "[ ]"} ${label}`;
}
