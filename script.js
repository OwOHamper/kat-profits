function formatNumber(number) {
    // Convert the number to an integer
    const integer = parseInt(number, 10);
  
    // Format the number by splitting every three digits
    return integer.toLocaleString();
  }

function oldTimestampToString(timestamp) {
  // get current timestamp
  const now = Date.now() / 1000;
  diff = now - timestamp;
  if (diff < 60) {
    return 'a few seconds ago';
  }
  else if (Math.floor(diff / 60) === 1) {
    return '1 minute ago';
  }
  else if (diff < 3600) {
    return `${Math.floor(diff / 60)} minutes ago`;
  }
  else if (Math.floor(diff / 3600) === 1) {
    return '1 hour ago';
  }
  else if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`;
  }
  else if (Math.floor(diff / 86400) === 1) {
    return '1 day ago';
  }
  else {
    return `${Math.floor(diff / 86400)} days ago`;
  }

}


function formatTime(hours) {
    // Convert hours to days and hours
    const days = Math.floor(hours / 24);
    const remainingHours = Math.round(hours % 24);
  
    if (remainingHours === 0) {
      // Display time in days only
      return `${days} days`;
    } else {
        if (days === 0) {
            // Display time in hours only
            return `${remainingHours} hours`;
        }
    else {
        // Display time in days and hours
        return `${days} days ${remainingHours} hours`;
    }
      
      
    }
  }

  function convertToImageName(inputString) {
    // Remove the "[Lvl xx] " prefix
    const nameWithoutPrefix = inputString.replace(/^\[Lvl \d+\]\s/, '');
    
    // Convert the name to lowercase and replace spaces with dashes
    const formattedName = nameWithoutPrefix.toLowerCase().replace(/\s/g, '-');
    
    // Add the ".png" extension
    // const imageName = formattedName + '.png';
    
    return formattedName;
  }

const rarityColors = {
    "COMMON": [255, 255, 255],
    "UNCOMMON": [0, 255, 0],
    "RARE": [0, 0, 255],
    "EPIC": [255, 0, 255],
    "LEGENDARY": [255, 255, 0],
    "MYTHIC": [255, 0, 0],
    "DIVINE": [255, 165, 0],
    "SPECIAL": [255, 0, 255],
    "VERY SPECIAL": [255, 0, 255]
};

const rarityToWool = {
    "COMMON": "white",
    "UNCOMMON": "lime",
    "RARE": "blue",
    "EPIC": "purple",
    "LEGENDARY": "yellow",
    "MYTHIC": "magenta",
    "DIVINE": "cyan",
    "SPECIAL": "red",
    "VERY SPECIAL": "red"
}


function createCard(test_data) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
  
    const imageBorder = document.createElement('div');
    imageBorder.classList.add('image-border');
  
    const imageBorderRarity = document.createElement('div');
    imageBorderRarity.classList.add('image-border-rarity');
    imageBorderRarity.id = 'image-border-rarity'; // Set the ID of the image border rarity
  
    const image = document.createElement('img');
    image.src = `assets/pets/${convertToImageName(test_data.item)}.png`;
    image.alt = '';
  
    imageBorderRarity.appendChild(image);
    imageBorder.appendChild(imageBorderRarity);
    cardHeader.appendChild(imageBorder);
  
    const petName = document.createElement('div');
    petName.classList.add('pet-name');
    petName.innerHTML = `<span id="pet-name">${test_data.item}</span>`;
    cardHeader.appendChild(petName);
  
    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
  
    const profit = document.createElement('div');
    profit.classList.add('profit');
    profit.innerHTML = `<span>Profit: </span><p id="profit">${formatNumber(test_data.profit)}</p>`;
    cardContent.appendChild(profit);
  
    const petCost = document.createElement('div');
    petCost.classList.add('pet-cost');
    petCost.innerHTML = `<span>Pet cost: </span><p id="cost">${formatNumber(test_data.item_cost)}</p>`;
    cardContent.appendChild(petCost);
  
    const upgradeCost = document.createElement('div');
    upgradeCost.classList.add('upgrade-cost');
    upgradeCost.innerHTML = `<span>Upgrade cost: </span><p id="upgrade">${formatNumber(test_data.upgrade_cost)}</p>`;
    cardContent.appendChild(upgradeCost);
  
    const materialCost = document.createElement('div');
    materialCost.classList.add('material', 'cost-cost');
    materialCost.innerHTML = `<span>Material cost: </span><p id="material">${formatNumber(test_data.material_cost)}</p>`;
    cardContent.appendChild(materialCost);
  
    const sumCost = document.createElement('div');
    sumCost.classList.add('sum-cost');
    sumCost.innerHTML = `<span>Sum cost: </span><p id="sum">${formatNumber(test_data.sum_cost)}</p>`;
    cardContent.appendChild(sumCost);
  
    const time = document.createElement('div');
    time.classList.add('time');
    time.innerHTML = `<span>Time: </span><p id="time">${formatTime(test_data.time)}</p>`;
    cardContent.appendChild(time);
  
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');
  
    const viewDetailsButton = document.createElement('button');
    viewDetailsButton.classList.add('card-button');
    viewDetailsButton.textContent = 'View details';
    cardFooter.appendChild(viewDetailsButton);
  
    const copyUUIDButton = document.createElement('button');
    copyUUIDButton.classList.add('card-button'), 'copy-auction-uuid';
    copyUUIDButton.textContent = 'Copy auction UUID';
    // copyUUIDButton.dataset.auctionUuid = test_data.auction_uuid;
    cardFooter.appendChild(copyUUIDButton);

    copyUUIDButton.addEventListener('click', () => {
        const auctionUUID = test_data.auction_uuid;
    
        // Copy the auction UUID to the clipboard
        copyToClipboard(`/viewauction ${auctionUUID}`);
    
        // Display a notification
        showNotification('Auction UUID copied!');
      });
  
    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    card.appendChild(cardFooter);
  
    const rarity = test_data.current_tier.toUpperCase();
    const color = rarityColors[rarity];
    if (color) {
      const rgb = `rgb(${color.join(',')})`;
      imageBorderRarity.style.backgroundColor = (rgb);
      imageBorderRarity.style.backgroundImage = `url(assets/overlays/wool/${rarityToWool[rarity]}.png)`;
      imageBorderRarity.style.backgroundSize = "35px";
      imageBorderRarity.style.backgroundRepeat = "repeat";
    }
  
    return card;
  }
  
// Function to copy text to clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

function showNotification(message) {
    // Create a notification element
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
  
    // Append the notification to the body
    document.body.appendChild(notification);

    notification.classList.add('notification-appear');

  
    // Automatically remove the notification after a certain time
    setTimeout(() => {
      notification.classList.remove('notification-appear');
      notification.classList.add('notification-disappear');
      setTimeout(() => {
        notification.remove();
      }, 500); // Duration of the disappear animation
    }, 3000);
  }




function loadKatProfits() {
  fetch('https://api.hamper.dev/skyblock/kat-profits')  // Replace 'http://localhost/api' with the actual URL of your API
    .then(response => response.json())
    .then(data => {
      console.log("test")

        const profits = data.profits;
        const cardContainer = document.getElementById('card-container'); // Replace 'card-container' with the actual ID of the container element for the cards
        const timeSpan = document.getElementById('time-string');
    
    
        // Remove the original card
        const slicedData = profits.slice(0, 100);
    
        slicedData.forEach(test_data => {
          const card = createCard(test_data);
          cardContainer.appendChild(card);
        });

        timeSpan.textContent = oldTimestampToString(data.updated);
        return data

      
      


    })
    .catch(error => console.error(error));
}

data = loadKatProfits();


window.addEventListener('load', function () {
  const lastUpdated = document.getElementById('lastUpdatedButton');
  const rotateIcon = document.getElementById('rotate-icon');
  lastUpdated.addEventListener('click', () => {
    rotateIcon.classList.add('fa-spin');
    // post request
    fetch('https://api.hamper.dev/skyblock/update-data', {
      method: 'POST',
  })
  .then(response => response.json())
  .then(data => {
    if (data.status == 'error') {
      console.log('error: ', data.message);
      showNotification(data.message)
    }
    else if (data.status == 'success') {
      console.log('success: ', data.message);
      loadKatProfits();
      // showNotification(data.message)
    }
    rotateIcon.classList.remove('fa-spin');
    // console.log(data);
  })
    // setTimeout(() => {
      // rotateIcon.classList.remove('fa-spin');
    // }, 10000);

});

});