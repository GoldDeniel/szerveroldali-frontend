
export async function getItems(uri){
    const response = await fetch(uri);
  if (!response.ok) {
    throw response.error;
  }
  const data = await response.json();
  return data;
}


export async function updateItem(uri, id, item) {
    try {
      const response = await fetch(`${uri}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Item updated:', data);
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  }

export async function postItem(uri, item) {
  try {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });

    if (!response.ok) { 
      throw new Error(response.status);
    }

    const data = await response.json();
    console.log('Item posted:', data);
    return data;
  } catch (error) {
    if (error.message === '409') {
      Error('Error: Item already exists');
    }
    else if (error.message === '400') {
      Error('Error: Invalid item');
    }
    else if (error.message === '401') {
      Error('Error: Unauthorized');
    }
    else {
      console.error('Error:', error);
    }
  }
}


export async function deleteItem(uri, id) {
  console.log("Deleting this fella: " + uri + id);
    try {
      const response = await fetch(`${uri}${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch((error) => {
        console.error('Error:', error);
      });
  
      if (response.ok) {
        
      } else {
        console.error('Error: Failed to delete item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
