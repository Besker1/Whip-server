CREATE TABLE recipes_table (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    content TEXT [],
    meal TEXT,
    is_vegan BOOLEAN,
    img TEXT NOT NULL
);


