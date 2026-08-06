# Module 16 – The Phoenix Codex Portfolio
---

## ✏️ Concept - 01

**🔤 Name:** Supabase client integration and authentication

**🎯 Purpose:**

Supabase provides the backend services used by this React portfolio. I used the
`@supabase/supabase-js` library to create one shared browser client that connects the
front end to the project's database and authentication services. The public Contact
page uses that client to insert a visitor's name, email address, and message. The hidden
Login page uses Supabase Auth to sign in the administrator, and the protected Back
Office uses the authenticated session to retrieve and delete messages.

At first I thought of Supabase as simply another database product. Researching it helped
me understand that it is a backend platform made from several services, with PostgreSQL
at its center. Supabase Auth issues and manages the user's session, while the Data API
allows the JavaScript client to operate on PostgreSQL tables. This was different from my
previous MongoDB experience because the same platform combined database access,
authentication, session management, and authorization rules.

In this project, `supabaseClient.js` is the single connection boundary. It reads the
project URL and low-privilege browser key from Vite environment variables, removes an
accidentally supplied `/rest/v1` suffix, and returns `null` when configuration is
missing. The client persists the login session and refreshes its token automatically.
Keeping this logic in one module prevents every page from creating its own connection
or handling configuration differently.

**❓ Why it was challenging:**

This was my first time seeing Supabase, so even its vocabulary was new to me: project
URL, publishable or anonymous key, Auth session, access token, Data API, and Row Level
Security. With MongoDB and SQL in DBeaver, I was used to opening a database connection,
running a query, and examining the result. Supabase required me to understand what
happens when a browser talks directly to backend services and why a key visible in the
compiled JavaScript must never have administrator privileges.

The hardest part was learning that authentication and authorization are separate. A
successful login establishes who the user is, but it does not by itself decide which
database operations that user may perform. PostgreSQL grants and Row Level Security
still control whether the authenticated role can select or delete a message. The public
route name also provides no security because anyone can discover client-side routes.

Session handling added another layer. The app first calls `getSession()` to see whether
the browser has stored session data, then calls `getUser()` to verify the current user
with the Supabase Auth server before rendering private information. This distinction was
not obvious on my first attempt, but the official documentation explains that
`getSession()` can read client storage whereas `getUser()` performs a network request
and returns authenticated user data. I also had to handle expired sessions, logout,
missing environment variables, failed requests, duplicate submissions, and safe error
messages without exposing raw backend details to a visitor.

My previous database experience still helped. Supabase's chained calls such as
`from('messages').insert(payload)`, `select(...)`, `order(...)`, and `delete().eq(...)`
represent familiar CRUD intentions. The new skill was connecting those operations to
React state, asynchronous requests, authentication events, and database-enforced
permissions.

**📍 Where (file & line):**

`src/lib/supabaseClient.js`, lines 8–30; `src/pages/ContactPage.jsx`, line 139;
`src/pages/LoginPage.jsx`, lines 153–161; `src/components/RequireSession.jsx`, lines
44–91; `src/pages/BackOfficePage.jsx`, lines 88–98, 174–183, and 213–225.

**📚 Research & references:**

- [Supabase Architecture](https://supabase.com/docs/guides/getting-started/architecture)
  explains that PostgreSQL is the core database and shows how Auth and the Data API fit
  around it.
- [Supabase JavaScript client initialization](https://supabase.com/docs/reference/javascript/initializing)
  documents the project URL, browser key, session persistence, and automatic token
  refresh options used by the shared client.
- [Supabase password sign-in](https://supabase.com/docs/reference/javascript/auth-signinwithpassword),
  [`getSession()`](https://supabase.com/docs/reference/javascript/auth-getsession), and
  [`getUser()`](https://supabase.com/docs/reference/javascript/auth-getuser) document the
  authentication flow used by Login and the protected route.

---

## ✏️ Concept - 02

**🔤 Name:** PostgreSQL schema design and Row Level Security

**🎯 Purpose:**

PostgreSQL is the relational database inside the Supabase project. It stores each
contact submission as a row in the `public.messages` table. The schema gives every row a
database-generated UUID primary key and a timezone-aware creation timestamp, and it
requires text values for `name`, `email`, and `message`. `NOT NULL` and `CHECK`
constraints reject incomplete or incorrectly sized data at the database boundary, even
if a request does not come through the React form.

This was my first direct experience with PostgreSQL. I had used SQL through DBeaver, so
`CREATE TABLE`, `INSERT`, `SELECT`, `DELETE`, constraints, and result sets were familiar.
The major realization was that DBeaver is a database management client and SQL editor,
not the database itself. It can connect to different database engines, and each engine
has its own features and SQL dialect. Here, PostgreSQL is the system that stores and
validates the data, while the Supabase SQL Editor or another authorized PostgreSQL
connection is only a tool for applying the schema.

My MongoDB background also provided a useful comparison. MongoDB stores records as
flexible BSON documents and allows validation to be added where stricter control is
needed. In this PostgreSQL table, I defined the expected structure and constraints up
front. PostgreSQL also supplied types I had not used before, including `uuid` and
`timestamptz`. For this use case, that strict database contract was useful because every
contact message must have the same essential fields and validation rules.

The other purpose of the SQL file is authorization. Table grants give the `anon` and
`authenticated` PostgreSQL roles only the operations they need. Row Level Security
(RLS) then applies policies whenever those roles access the table. Public visitors may
insert a message, but they cannot select existing messages or delete them. An
authenticated administrator may insert, select, and delete. The public user receives no
update permission because editing a submitted message is not part of the application.

**❓ Why it was challenging:**

The basic SQL syntax was less difficult because of my previous DBeaver experience. The
challenge was learning PostgreSQL-specific schema and security features well enough to
use them together. I had to decide which rules belonged in React validation and which
had to be repeated as database constraints. Client-side validation gives a visitor
immediate feedback, but it cannot be trusted as the final boundary because a direct API
request can bypass the form. PostgreSQL constraints keep the stored data valid no
matter which client sends the request.

RLS was entirely new to me. I had to understand two layers that initially looked
duplicative. `GRANT` determines whether a role can attempt an operation on the table;
an RLS policy determines which rows that role may access for that operation. PostgreSQL
uses a default-deny behavior after RLS is enabled when no applicable policy exists. In
this project I made the allowed operations explicit, rather than depending on hidden
defaults.

Writing separate `INSERT`, `SELECT`, and `DELETE` policies forced me to reason from the
perspective of each user. The public insert policy uses `WITH CHECK`, which controls
whether a new row may be created. The authenticated read and delete policies use
`USING`, which controls which existing rows are visible to those operations. Because
this is a single-administrator portfolio, each authenticated policy currently accepts
all rows with `true`; the role itself is established through Supabase Auth.

This concept connected my earlier skills to a deeper lesson: a graphical tool such as
DBeaver makes it convenient to run SQL and inspect data, but the schema, grants, and RLS
policies must protect the table even when the UI or database client is not present.

**📍 Where (file & line):**

`supabase/messages.sql`, lines 9–52.

**📚 Research & references:**

- [PostgreSQL data types](https://www.postgresql.org/docs/current/datatype.html)
  documents native types such as `text`, `uuid`, and `timestamp with time zone` used in
  the schema.
- [PostgreSQL constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
  explains the `CHECK`, `NOT NULL`, and primary-key rules that keep stored rows valid.
- [PostgreSQL Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
  explains role- and command-specific policies, `USING`, `WITH CHECK`, and default-deny
  behavior.
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
  explains why RLS must protect tables exposed through the browser-facing API and how
  it works with Supabase Auth.
- [DBeaver SQL Editor](https://dbeaver.com/docs/dbeaver/SQL-Editor/) describes DBeaver's
  role as the interface for writing and executing SQL against a database connection.
- [MongoDB Data Modeling](https://www.mongodb.com/docs/manual/data-modeling/) documents
  MongoDB's flexible document model, which helped me compare my previous experience to
  PostgreSQL's table schema.

---

## ✏️ Concept - 03

**🔤 Name:** Three.js WebGL scenes and lifecycle management

**🎯 Purpose:**

Three.js adds two progressive WebGL experiences to the portfolio. The Home page has an
animated, textured double-helix ribbon, and the Journey page has a phoenix image plane,
a curved ember trail, and a particle system that responds to scrolling and pointer
movement. These scenes add atmosphere, but all headings, résumé information, links, and
controls remain normal semantic HTML so the site still works when WebGL is unavailable.

Three.js introduced a completely different mental model from the database technologies
I had used. A minimal scene needs a `Scene`, a `Camera`, and a `WebGLRenderer`. Visible
objects are usually meshes that combine geometry, which defines their points and shape,
with a material, which defines how they are drawn. The camera determines what portion
of the virtual world is visible, and the renderer draws that view into a browser
`canvas`.

The Home ribbon required custom geometry rather than a built-in cube or plane. I created
typed arrays for vertex positions and UV texture coordinates, generated triangle
indices between each pair of segments, and placed the data into a `BufferGeometry`.
The texture is drawn on an off-screen two-dimensional canvas, converted to a
`CanvasTexture`, and wrapped around two phase-offset ribbon meshes. This connected 2D
canvas drawing, three-dimensional coordinates, and texture mapping in one component.

The Journey scene uses a different group of Three.js concepts. `TextureLoader` places
the phoenix artwork on a plane. `CatmullRomCurve3` defines the route followed by seeded
particle positions, and additive blending makes those particles resemble glowing
embers. The camera and scene group react gradually to scroll position, pointer position,
and the selected timeline milestone.

**❓ Why it was challenging:**

Because this was my first time seeing Three.js, the coordinate system, scene graph,
camera field of view, clipping planes, vertices, normals, UVs, materials, textures, and
render loop were all new at once. Unlike querying MongoDB or SQL, there was no result
table that immediately showed whether my reasoning was correct. A small mistake could
produce a blank canvas, distorted geometry, a reversed texture, poor frame rate, or an
object positioned outside the camera's view.

Custom geometry was the most mathematical part. For every ribbon segment, I calculated
a center point on a tapering helix and used tangent, normal, and side vectors to place
the left and right edges. I then mapped texture coordinates along the ribbon and joined
the vertices into triangles. I had to understand both the visual goal and the data
format expected by the GPU.

Integrating a continuous animation with React created another challenge. The scene is
created inside `useEffect`, but it also allocates GPU resources and registers browser
event listeners. Three.js does not automatically release geometries, materials, or
textures when a React component unmounts. The cleanup function therefore cancels the
animation frame, disconnects observers, removes event listeners, and explicitly calls
`dispose()` on each resource and renderer. This prevents old route visits from leaving
unused GPU memory behind.

Performance and accessibility also changed the definition of “working.” The renderer
caps its pixel ratio, recalculates camera aspect and size when the viewport changes, and
pauses animation when the scene or document is not visible. The code checks
`prefers-reduced-motion`, avoids pointer animation for those users, catches WebGL
initialization failure, and exposes each canvas as decorative with `aria-hidden`. The
static content and image fallback remain available. I learned that a successful 3D web
feature must manage its entire lifecycle and degrade safely, not merely render an
attractive animation on my own computer.

**📍 Where (file & line):**

`src/components/HomeVortex.jsx`, lines 64–188 and 190–295;
`src/components/PortfolioExperience.jsx`, lines 41–125 and 141–282.

**📚 Research & references:**

- [Three.js: Creating a scene](https://threejs.org/manual/en/creating-a-scene.html)
  introduces the scene, perspective camera, renderer, geometry, material, mesh, and
  animation loop used as the foundation of both components.
- [Three.js Fundamentals](https://threejs.org/manual/en/fundamentals.html) explains the
  scene graph and how geometry supplies the vertices used to display objects.
- [Three.js Responsive Design](https://threejs.org/manual/en/responsive.html) explains
  canvas sizing, camera aspect updates, and the performance implications of render
  resolution.
- [Three.js: How to dispose of objects](https://threejs.org/manual/en/how-to-dispose-of-objects.html)
  explains why geometries, materials, textures, and other WebGL resources require
  explicit cleanup.

---
