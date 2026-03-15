import * as SQLite from "expo-sqlite";

export async function schemaDatabase(db: SQLite.SQLiteDatabase) {
  await db.withExclusiveTransactionAsync(async () => {
    await db.execAsync(`
      CREATE TABLE products (
        -- primary key
        id_products INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        name TEXT UNIQUE NOT NULL,
        stock_quantity INTEGER NOT NULL,
        -- checks
        CONSTRAINT chk_stock_quantity CHECK (stock_quantity >= 0)
      );

      CREATE TABLE recipes (
        -- primary key
        id_recipes INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        name TEXT UNIQUE NOT NULL,
        duration_in_minutes INTEGER,
        preview_image_url TEXT,
        is_morning INTEGER NOT NULL DEFAULT 0,
        type TEXT NOT NULL CHECK(
          type IN (
            'PETIT-DÉJ.',
            'PLAT PRINC.',
            'LÉGUMES',
            'ACCOMP.',
            'DESSERT'
          )
        ),
        recipe TEXT
      );

      CREATE TABLE cooking_ustensils (
        -- primary key
        id_cooking_ustensils INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        name TEXT UNIQUE NOT NULL
      );

      CREATE TABLE storage_locations (
        -- primary key
        id_storage_locations INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        name TEXT UNIQUE NOT NULL
      );

      CREATE TABLE shopping_lists (
        -- primary key
        id_shopping_lists INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE recipe_categories (
        -- primary key
        id_recipe_categories INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        name TEXT UNIQUE NOT NULL
      );

      CREATE TABLE ingredient_categories (
        -- primary key
        id_ingredient_categories INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        name TEXT UNIQUE NOT NULL
      );

      CREATE TABLE days (
        -- primary key
        id_days INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        name TEXT UNIQUE NOT NULL CHECK(
          name IN (
            'LUNDI',
            'MARDI',
            'MERCREDI',
            'JEUDI',
            'VENDREDI',
            'SAMEDI',
            'DIMANCHE'
          )
        )
      );

      CREATE TABLE moments (
        -- primary key
        id_moments INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        name TEXT UNIQUE NOT NULL CHECK(name IN ('MATIN', 'MIDI', 'SOIR'))
      );

      CREATE TABLE units (
        id_units INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        abbreviation TEXT NOT NULL
      );

      CREATE TABLE menu_categories (
        -- primary key
        id_menu_categories INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        name TEXT UNIQUE NOT NULL CHECK(
          name IN (
            'BOISSON CHAUDE',
            'ACCOMPAGNEMENT MATIN',
            'FRUIT',
            'PROTÉINES',
            'LÉGUMES',
            'ACCOMPAGNEMENT REPAS',
            'DESSERT',
            'AUTRE'
          )
        )
      );

      CREATE TABLE ingredients (
        -- primary key
        id_ingredients INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        name TEXT UNIQUE NOT NULL,
        quantifiable INTEGER NOT NULL DEFAULT 1,
        stock_quantity INTEGER,
        id_ingredient_categories INTEGER,
        id_units INTEGER,
        -- checks
        CONSTRAINT chk_stock_quantity CHECK (stock_quantity >= 0),
        -- foreign keys
        CONSTRAINT FK_Ingredients_IngredientCategories FOREIGN KEY (id_ingredient_categories) REFERENCES ingredient_categories(id_ingredient_categories) ON DELETE SET NULL ON UPDATE CASCADE,
          CONSTRAINT FK_Ingredients_Units FOREIGN KEY (id_units) REFERENCES units(id_units) ON DELETE SET NULL ON UPDATE CASCADE
      );

      CREATE TABLE menus (
        -- primary key
        id_menus INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        done INTEGER NOT NULL DEFAULT 0,
        id_moments INTEGER,
        id_days INTEGER,
        -- foreign keys
        CONSTRAINT FK_Menus_Moments FOREIGN KEY (id_moments) REFERENCES moments (id_moments) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_Menus_Days FOREIGN KEY (id_days) REFERENCES days (id_days) ON DELETE CASCADE ON UPDATE CASCADE,
        -- unique
        CONSTRAINT unique_day_moment UNIQUE (id_days, id_moments)
      );

      CREATE TABLE cooking_infos (
        -- primary key
        id_cooking_infos INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        preparation_type TEXT,
        id_ingredients INTEGER,
        -- foreign keys
        CONSTRAINT FK_CookingInfos_Ingredients FOREIGN KEY (id_ingredients) REFERENCES ingredients (id_ingredients) ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE cooking_durations (
        -- primary key
        id_cooking_durations INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        duration_in_minutes INTEGER,
        temperature INTEGER,
        id_cooking_infos INTEGER,
        id_cooking_ustensils INTEGER,
        -- foreign keys
        CONSTRAINT FK_CookingDurations_CookingInfos FOREIGN KEY (id_cooking_infos) REFERENCES cooking_infos (id_cooking_infos) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_CookingDurations_CookingUstensils FOREIGN KEY (id_cooking_ustensils) REFERENCES cooking_ustensils (id_cooking_ustensils) ON DELETE SET NULL ON UPDATE CASCADE
      );

      CREATE TABLE storage_infos (
        -- primary key
        id_storage_infos INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        duration INTEGER,
        units TEXT NOT NULL CHECK(
          units IN (
            'JOURS',
            'SEMAINES',
            'MOIS',
            'DATE DE PÉREMPTION',
            'INDÉFINIMENT'
          )
        ),
        type TEXT CHECK(
          type IN ('APRÈS OUVERTURE', 'AVANT OUVERTURE')
        ),
        id_ingredients INTEGER,
        id_storage_locations INTEGER,
        -- foreign keys
        CONSTRAINT FK_StorageInfos_Ingredients FOREIGN KEY (id_ingredients) REFERENCES ingredients (id_ingredients) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_StorageInfos_StorageLocations FOREIGN KEY (id_storage_locations) REFERENCES storage_locations (id_storage_locations) ON DELETE SET NULL ON UPDATE CASCADE
      );

      CREATE TABLE menu_ingredient_manual_checks (
        -- primary key
        id_menu_ingredient_manual_checks INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        usage_count INTEGER NOT NULL,
        checked INTEGER NOT NULL DEFAULT 0,
        id_ingredients INTEGER UNIQUE,
        -- foreign keys
        CONSTRAINT FK_MenuIngredientManualChecks_Ingredients FOREIGN KEY (id_ingredients) REFERENCES ingredients (id_ingredients) ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE shopping_list_items (
        -- primary key
        id_shopping_list_items INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        quantity_needed INTEGER NOT NULL,
        quantity_buyed INTEGER NOT NULL,
        quantifiable INTEGER NOT NULL DEFAULT 1,
        id_units INTEGER,
        id_shopping_lists INTEGER,
        id_products INTEGER,
        id_ingredients INTEGER,
        -- checks
        CONSTRAINT chk_quantity_needed CHECK (quantity_needed >= 1),
        CONSTRAINT chk_quantity_buyed CHECK (quantity_buyed >= 0),
        CONSTRAINT chk_product_xor_ingredient CHECK (
          (
            id_products IS NOT NULL
            AND id_ingredients IS NULL
          )
          OR (
            id_products IS NULL
            AND id_ingredients IS NOT NULL
          )
        ),
        -- foreign keys
        CONSTRAINT FK_ShoppingListItems_Units FOREIGN KEY (id_units) REFERENCES units (id_units) ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT FK_ShoppingListItems_ShoppingLists FOREIGN KEY (id_shopping_lists) REFERENCES shopping_lists (id_shopping_lists) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_ShoppingListItems_Products FOREIGN KEY (id_products) REFERENCES products (id_products) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_ShoppingListItems_Ingredients FOREIGN KEY (id_ingredients) REFERENCES ingredients (id_ingredients) ON DELETE CASCADE ON UPDATE CASCADE,
        -- unique
        CONSTRAINT unique_list_product UNIQUE (id_shopping_lists, id_products),
        CONSTRAINT unique_list_ingredient UNIQUE (id_shopping_lists, id_ingredients)
      );

      CREATE TABLE shopping_list_manual_checks (
        -- primary key
        id_shopping_list_manual_checks INTEGER PRIMARY KEY AUTOINCREMENT,
        -- colonnes
        usage_count INTEGER NOT NULL,
        checked INTEGER NOT NULL DEFAULT 0,
        id_ingredients INTEGER UNIQUE,
        id_shopping_lists INTEGER,
        -- foreign keys
        CONSTRAINT FK_ShoppingListManualChecks_Ingredients FOREIGN KEY (id_ingredients) REFERENCES ingredients (id_ingredients) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_ShoppingListManualChecks_ShoppingLists FOREIGN KEY (id_shopping_lists) REFERENCES shopping_lists (id_shopping_lists) ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE ingredient_storage_location_links (
        -- colonnes
        id_ingredients INTEGER NOT NULL,
        id_storage_locations INTEGER NOT NULL,
        -- primary key
        PRIMARY KEY (id_ingredients, id_storage_locations),
        -- foreign keys
        CONSTRAINT FK_IngredientStorageLocationLinks_Ingredients FOREIGN KEY (id_ingredients) REFERENCES ingredients (id_ingredients) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_IngredientStorageLocationLinks_StorageLocations FOREIGN KEY (id_storage_locations) REFERENCES storage_locations (id_storage_locations) ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE menu_ingredient_links (
        -- colonnes
        id_menus INTEGER NOT NULL,
        id_ingredients INTEGER NOT NULL,
        quantity INTEGER,
        id_units INTEGER,
        -- primary key
        PRIMARY KEY (id_menus, id_ingredients),
        -- checks
        CONSTRAINT chk_menu_ingredient_quantity CHECK (quantity >= 1),
        -- foreign keys
        CONSTRAINT FK_MenuIngredientLinks_Menus FOREIGN KEY (id_menus) REFERENCES menus (id_menus) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_MenuIngredientLinks_Ingredients FOREIGN KEY (id_ingredients) REFERENCES ingredients (id_ingredients) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_MenuIngredientLinks_Units FOREIGN KEY (id_units) REFERENCES units (id_units) ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE recipe_ingredient_links (
        -- colonnes
        id_recipes INTEGER NOT NULL,
        id_ingredients INTEGER NOT NULL,
        quantity INTEGER,
        id_units INTEGER,
        -- primary key
        PRIMARY KEY (id_recipes, id_ingredients),
        -- foreign keys
        CONSTRAINT FK_RecipeIngredientLinks_Recipes FOREIGN KEY (id_recipes) REFERENCES recipes (id_recipes) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_RecipeIngredientLinks_Ingredients FOREIGN KEY (id_ingredients) REFERENCES ingredients (id_ingredients) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_RecipeIngredientLinks_Units FOREIGN KEY (id_units) REFERENCES units (id_units) ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE recipe_category_links (
        -- colonnes
        id_recipes INTEGER NOT NULL,
        id_recipe_categories INTEGER NOT NULL,
        -- primary key
        PRIMARY KEY (id_recipes, id_recipe_categories),
        -- foreign key
        CONSTRAINT FK_RecipeCategoryLinks_Recipes FOREIGN KEY (id_recipes) REFERENCES recipes (id_recipes) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_RecipeCategoryLinks_RecipeCategories FOREIGN KEY (id_recipe_categories) REFERENCES recipe_categories (id_recipe_categories) ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE menu_category_moments_links (
        -- colonnes
        id_menu_categories INTEGER NOT NULL,
        id_moments INTEGER NOT NULL,
        -- primary key
        PRIMARY KEY (id_menu_categories, id_moments) -- foreign key
        CONSTRAINT FK_MenuCategoryMomentsLinks_MenuCategories FOREIGN KEY (id_menu_categories) REFERENCES menu_categories (id_menu_categories) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_MenuCategoryMomentsLinks_Moments FOREIGN KEY (id_moments) REFERENCES moments (id_moments) ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE ingredient_menu_category_links (
        -- colonnes
        id_ingredients INTEGER NOT NULL,
        id_menu_categories INTEGER NOT NULL,
        -- primary key
        PRIMARY KEY (id_ingredients, id_menu_categories),
        -- foreign key
        CONSTRAINT FK_IngredientMenuCategoryLinks_Ingredients FOREIGN KEY (id_ingredients) REFERENCES ingredients (id_ingredients) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_IngredientMenuCategoryLinks_MenuCategories FOREIGN KEY (id_menu_categories) REFERENCES menu_categories (id_menu_categories) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  });
}