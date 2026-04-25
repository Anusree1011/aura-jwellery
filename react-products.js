// ============================================
// react-products.js — React Products Section
// ============================================
// This file uses BASIC React concepts:
//   • Components (functions that return HTML-like JSX)
//   • Props     (passing data into a component)
//   • useState  (remembering a value that can change)
// ============================================

// ---- STEP 1: Our product data (like a mini database) ----
var productsData = [
  { id: 1, name: "Celestine Ring",   price: "₹4,850", emoji: "💍", tag: "New" },
  { id: 2, name: "Lumière Necklace", price: "₹7,200", emoji: "📿", tag: ""    },
  { id: 3, name: "Soleil Earrings",  price: "₹3,600", emoji: "✨", tag: "New" },
  { id: 4, name: "Dorée Bracelet",   price: "₹5,100", emoji: "🪙", tag: ""    },
];


// ---- STEP 2: ProductCard Component ----
// This is one card for a single product.
// "props" carries the product info (name, price, emoji).

function ProductCard(props) {
  // useState: "added" starts as false.
  // When button is clicked, it becomes true → button turns green.
  var addedState = React.useState(false);
  var added      = addedState[0];   // current value
  var setAdded   = addedState[1];   // function to change it

  function handleClick() {
    setAdded(true);                      // turn button green
    addItemToCart(props.name);           // call our JS function (cart counter + toast)

    // After 2 seconds, reset the button back to normal
    setTimeout(function () {
      setAdded(false);
    }, 2000);
  }

  return React.createElement(
    "div", { className: "prod-card" },

    // Product image area (emoji as placeholder)
    React.createElement(
      "div", { className: "prod-img" },
      props.emoji,

      // "New" badge — only show if tag exists
      props.tag
        ? React.createElement("span", {
            style: {
              position: "absolute", top: "8px", left: "8px",
              background: "#c08040", color: "#fff",
              fontSize: "0.6rem", padding: "3px 8px",
              letterSpacing: "1px", textTransform: "uppercase",
            }
          }, props.tag)
        : null
    ),

    // Product info area
    React.createElement(
      "div", { className: "prod-body" },
      React.createElement("h3", null, props.name),
      React.createElement("p",  { className: "prod-price" }, props.price),
      React.createElement(
        "button",
        {
          className: added ? "add-btn added" : "add-btn",
          onClick: handleClick,
        },
        added ? "✓ Added!" : "Add to Cart"
      )
    )
  );
}


// ---- STEP 3: ProductsList Component ----
// This component holds ALL the product cards.
// It loops through productsData and makes one ProductCard for each.

function ProductsList() {
  return React.createElement(
    "div", { className: "prod-row" },

    // .map() goes through each product and creates a ProductCard
    productsData.map(function (product) {
      return React.createElement(ProductCard, {
        key:   product.id,     // React needs a unique key
        name:  product.name,
        price: product.price,
        emoji: product.emoji,
        tag:   product.tag,
      });
    })
  );
}


// ---- STEP 4: Mount React into the page ----
// We find <div id="react-products"> in index.html
// and tell React to render ProductsList inside it.

var container = document.getElementById("react-products");
var root      = ReactDOM.createRoot(container);
root.render(React.createElement(ProductsList, null));
