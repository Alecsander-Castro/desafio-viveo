export async function getUsers() {
    try {
       const response =  await fetch("http://localhost:4000/users")
       return response.json()
    } catch(error) {
        return error
    }
    
}
export async function createUser(userData: object) {
    try {
      const response = await fetch("http://localhost:4000/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      return response.json()
    } catch (error) {
      return error;
    }
  }
