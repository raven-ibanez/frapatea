/*
  # Add Frapatea Menu Items

  1. New Categories
    - meals-specialties  : Mains & Specialties (pork, chicken, bagnet, beef pares)
    - kare-kare-sisig    : Kare-Kare & Sisig
    - rice-bowls         : Rice Bowls (₱110 each)
    - classic-frappe     : Classic Frappe (Choco & Coffee Based)
    - signature-shakes   : Signature Milkshakes (Fruit & Cream Based)
    - branded-cream      : Branded Cream Cheese (22 oz Grande only)
    - creaminess-tea     : Creaminess & Tea
    - experience-cups    : Frapatea Experience Cups
    - beverage-addons    : Beverage Add-ons

  2. New Menu Items
    - Mains & Specialties: Pork Gyupsal, Korean Chicken, Bagnet Meal variants, Beef/Bagnet Pares
    - Kare-Kare & Sisig: Ulam only, Ulam with rice
    - Rice Bowls: 7 bowl options at ₱110 each
    - Classic Frappe: 14 flavors with Small/Tall/Grande sizes
    - Signature Milkshakes: 12 flavors with Small/Tall/Grande sizes
    - Branded Cream Cheese: 6 flavors, Grande only at ₱110
    - Creaminess & Tea: 6 flavors starting at ₱60
    - Experience Cups: 4 flavors at ₱50 each

  3. Add-ons
    - 9 beverage add-ons at ₱10 each
*/

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('meals-specialties', 'Mains & Specialties', '🍖', 10, true),
  ('kare-kare-sisig',   'Kare-Kare & Sisig',   '🍲', 11, true),
  ('rice-bowls',        'Rice Bowls',           '🍚', 12, true),
  ('classic-frappe',    'Classic Frappe',       '☕', 20, true),
  ('signature-shakes',  'Signature Milkshakes', '🥛', 21, true),
  ('branded-cream',     'Branded Cream Cheese', '🍫', 22, true),
  ('creaminess-tea',    'Creaminess & Tea',     '🍵', 23, true),
  ('experience-cups',   'Experience Cups',      '🧋', 24, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- MAINS & SPECIALTIES
-- ============================================================
-- Pork Gyupsal (base price = 170, includes free drink—noted in description)
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Pork Gyupsal',     'Grilled pork gyupsal served as a meal set with a free drink.', 170, 'meals-specialties', true,  true),
  ('Korean Chicken',   'Tender Korean-style chicken meal set with a free drink.',       170, 'meals-specialties', true,  true),
  ('Bagnet Meal Solo', 'Crispy bagnet served as a solo meal.',                           135, 'meals-specialties', false, true),
  ('Bagnet Meal',      'Crispy bagnet meal served with a drink.',                        155, 'meals-specialties', true,  true),
  ('Beef Pares',       'Slow-braised beef pares with garlic fried rice and broth.',      130, 'meals-specialties', true,  true),
  ('Bagnet Pares',     'Crispy bagnet pares with garlic fried rice and broth.',          130, 'meals-specialties', false, true);

-- ============================================================
-- KARE-KARE & SISIG
-- ============================================================
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Kare-Kare & Sisig (Ulam Only)', 'Rich kare-kare and sizzling sisig — good for 2, ulam only.',          180, 'kare-kare-sisig', true,  true),
  ('Kare-Kare & Sisig Set',         'Rich kare-kare and sizzling sisig — good for 2, served with 2 rice.', 200, 'kare-kare-sisig', true,  true);

-- ============================================================
-- RICE BOWLS  (all ₱110)
-- ============================================================
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Chicken Burger Bowl',        'Crispy chicken burger patty served over a bed of steamed rice.',                      110, 'rice-bowls', true,  true),
  ('Wings Bowl',                 'Saucy chicken wings (Garlic Parmesan or Buffalo) over steamed rice.',                110, 'rice-bowls', true,  true),
  ('Double Sausage Bowl',        'Double serving of savory sausage links over steamed rice.',                          110, 'rice-bowls', false, true),
  ('Crispy Chicken Teriyaki Bowl','Golden crispy chicken glazed with teriyaki sauce over steamed rice.',               110, 'rice-bowls', true,  true),
  ('Longga Bits Bowl',           'Bite-sized sweet longanisa pieces served over steamed rice.',                        110, 'rice-bowls', false, true),
  ('Burger Steak with Fries Bowl','Juicy burger steak with fries served alongside steamed rice.',                      110, 'rice-bowls', false, true),
  ('Cheesy Bacon Bowl',          'Crispy bacon strips topped with melted cheese over steamed rice.',                   110, 'rice-bowls', true,  true);

-- Add variation for Wings Bowl (flavor choice)
INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Garlic Parmesan', 0 FROM menu_items WHERE name = 'Wings Bowl'
ON CONFLICT DO NOTHING;

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Buffalo', 0 FROM menu_items WHERE name = 'Wings Bowl'
ON CONFLICT DO NOTHING;

-- ============================================================
-- CLASSIC FRAPPE  (Choco & Coffee Based)
-- The 14 flavors are implemented as separate menu items sharing
-- small / tall / grande size variations.
-- base_price = Small price (50). Grande range noted in description.
-- ============================================================
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Choco Moo Frappe',             'Classic chocolate milk frappe with a creamy finish.',                     50, 'classic-frappe', false, true),
  ('Double Choco Flakes Frappe',   'Rich double chocolate frappe topped with crispy choco flakes.',           50, 'classic-frappe', false, true),
  ('Dark Choco Frappe',            'Intense dark chocolate frappe for true chocolate lovers.',                 50, 'classic-frappe', false, true),
  ('Magnolia Choco Frappe',        'Smooth Magnolia chocolate-based blended frappe.',                         50, 'classic-frappe', false, true),
  ('Java Chip Frappe',             'Bold coffee frappe blended with chocolate java chips.',                   50, 'classic-frappe', true,  true),
  ('Choco Mallows Frappe',         'Chocolate frappe topped with toasted marshmallows.',                      50, 'classic-frappe', false, true),
  ('Chocnut Frappe',               'Nostalgia-packed choc''nut candy blended into a creamy frappe.',          50, 'classic-frappe', false, true),
  ('Choco Malt Frappe',            'Malted chocolate blended frappe with a smooth, creamy texture.',          50, 'classic-frappe', false, true),
  ('Choco Fudge Brownie Frappe',   'Fudgy brownie bits blended into a rich chocolate frappe.',                50, 'classic-frappe', true,  true),
  ('Coffee Susu Frappe',           'Creamy milk coffee frappe with a silky-smooth texture.',                  50, 'classic-frappe', false, true),
  ('Mocha Cocoa Frappe',           'A perfect mocha-cocoa blend in an iced frappe.',                         50, 'classic-frappe', false, true),
  ('Coffee Jelly Frappe',          'Coffee frappe loaded with espresso-flavored jelly bits.',                 50, 'classic-frappe', true,  true),
  ('Caramel Macchiato Frappe',     'Layered caramel and espresso frappe with a caramel drizzle.',             50, 'classic-frappe', true,  true),
  ('White Christmas Coffee Frappe','Smooth white chocolate coffee frappe with a festive flair.',              50, 'classic-frappe', false, true);

-- Size variations for all Classic Frappes
DO $$
DECLARE
  item_record RECORD;
BEGIN
  FOR item_record IN
    SELECT id FROM menu_items WHERE category = 'classic-frappe'
  LOOP
    INSERT INTO variations (menu_item_id, name, price) VALUES
      (item_record.id, 'Small',  0),
      (item_record.id, 'Tall',   10),
      (item_record.id, 'Grande', 20)
    ON CONFLICT DO NOTHING;
  END LOOP;
END $$;

-- ============================================================
-- SIGNATURE MILKSHAKES  (Fruit & Cream Based)
-- base_price = Small (50). Tall: +10 to +20, Grande: +20 to +30
-- ============================================================
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Strawberries & Cream Milkshake', 'Fresh strawberries blended with cream into a luscious milkshake.',       50, 'signature-shakes', true,  true),
  ('Buko Pandan Milkshake',          'Classic Filipino buko pandan flavors in a creamy blended shake.',         50, 'signature-shakes', true,  true),
  ('Buko Crema Milkshake',           'Creamy coconut-based shake with a smooth, custard-like finish.',         50, 'signature-shakes', false, true),
  ('Tearific Taro Milkshake',        'Earthy taro root blended into a rich and creamy milkshake.',             50, 'signature-shakes', true,  true),
  ('Ube Milkshake',                  'Vibrant purple ube blended into a sweet and creamy milkshake.',          50, 'signature-shakes', true,  true),
  ('Melon Baby Milkshake',           'Sweet and refreshing honeydew melon blended into a frosty shake.',       50, 'signature-shakes', false, true),
  ('Mango Chunks Milkshake',         'Chunky fresh mango pieces blended into a thick tropical shake.',         50, 'signature-shakes', true,  true),
  ('Mango Graham Milkshake',         'Mango milkshake layered with graham crackers for a dessert-like treat.',  50, 'signature-shakes', false, true),
  ('Oreo Milkshake',                 'Crushed Oreo cookies blended into a thick and creamy milkshake.',        50, 'signature-shakes', true,  true),
  ('Graham Milkshake',               'Creamy milkshake with a delightful graham cracker base.',               50, 'signature-shakes', false, true),
  ('Creamilk Milkshake',             'Rich Creamilk chocolate blended into a smooth, velvety shake.',          50, 'signature-shakes', false, true),
  ('Matcha Milkshake',               'Premium Japanese matcha powder blended with milk for a balanced shake.', 50, 'signature-shakes', true,  true);

-- Size variations for all Signature Milkshakes
DO $$
DECLARE
  item_record RECORD;
BEGIN
  FOR item_record IN
    SELECT id FROM menu_items WHERE category = 'signature-shakes'
  LOOP
    INSERT INTO variations (menu_item_id, name, price) VALUES
      (item_record.id, 'Small',  0),
      (item_record.id, 'Tall',   10),
      (item_record.id, 'Grande', 20)
    ON CONFLICT DO NOTHING;
  END LOOP;
END $$;

-- ============================================================
-- BRANDED CREAM CHEESE  (22 oz Grande only — ₱110)
-- ============================================================
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Ferrero Rocher Cream Cheese', 'Luxurious Ferrero Rocher-infused cream cheese blended drink (22 oz Grande).', 110, 'branded-cream', true,  true),
  ('Nutella Cream Cheese',        'Creamy Nutella hazelnut cream cheese blended drink (22 oz Grande).',          110, 'branded-cream', true,  true),
  ('Reese''s Cream Cheese',       'Peanut butter Reese''s cream cheese blended drink (22 oz Grande).',          110, 'branded-cream', false, true),
  ('Hershey''s Cream Cheese',     'Classic Hershey''s chocolate cream cheese blended drink (22 oz Grande).',   110, 'branded-cream', false, true),
  ('Milo Cream Cheese',           'Milo-flavored cream cheese blended drink (22 oz Grande).',                   110, 'branded-cream', false, true),
  ('Crunch Cream Cheese',         'Nestlé Crunch bar cream cheese blended drink (22 oz Grande).',               110, 'branded-cream', false, true);

-- ============================================================
-- CREAMINESS & TEA  (starts at ₱60)
-- ============================================================
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Sparkling Strawberry Tea',      'Sparkling strawberry-infused cream tea, refreshingly fizzy.',       60, 'creaminess-tea', true,  true),
  ('Dark Choco Tea',                'Rich dark chocolate blended into a creamy tea drink.',               60, 'creaminess-tea', false, true),
  ('Choco Naicha',                  'Japanese-inspired chocolate milk tea with a smooth finish.',         60, 'creaminess-tea', false, true),
  ('Coffee Jelly Tea',              'Creamy milk tea loaded with coffee-flavored jelly bits.',            60, 'creaminess-tea', true,  true),
  ('Kitkat Green Tea Matcha',       'Kitkat-infused matcha cream tea for a unique sweet-bitter blend.',   60, 'creaminess-tea', true,  true),
  ('Wintermelon Tea',               'Classic wintermelon cream tea with a subtle, naturally sweet taste.',60, 'creaminess-tea', false, true);

-- ============================================================
-- FRAPATEA EXPERIENCE CUPS  (₱50 each)
-- ============================================================
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Oreo Experience Cup',                   'Frapatea signature cup packed with Oreo goodness.',                   50, 'experience-cups', true,  true),
  ('Mango Chunks Experience Cup',           'Frapatea cup filled with fresh chunky mango delight.',               50, 'experience-cups', true,  true),
  ('Strawberries & Cream Experience Cup',   'Frapatea cup with luscious strawberries and cream.',                 50, 'experience-cups', true,  true),
  ('Buko Pandan Delight Experience Cup',    'Frapatea cup with a refreshing buko pandan dessert experience.',     50, 'experience-cups', false, true);

-- ============================================================
-- BEVERAGE ADD-ONS  (₱10 each — linked to all beverage categories)
-- These are global add-ons; insert once per beverage item.
-- ============================================================
DO $$
DECLARE
  item_record RECORD;
  addon_names TEXT[] := ARRAY[
    'Pearl', 'Nata', 'Pudding', 'Choco Chips',
    'Coffee Jelly', 'Cookies', 'Graham', 'Whip Cream', 'Cotton Puff'
  ];
  addon_name TEXT;
BEGIN
  FOR item_record IN
    SELECT id FROM menu_items
    WHERE category IN ('classic-frappe', 'signature-shakes', 'branded-cream', 'creaminess-tea', 'experience-cups')
  LOOP
    FOREACH addon_name IN ARRAY addon_names
    LOOP
      INSERT INTO add_ons (menu_item_id, name, price, category)
      VALUES (item_record.id, addon_name, 10, 'Add-ons')
      ON CONFLICT DO NOTHING;
    END LOOP;
  END LOOP;
END $$;
