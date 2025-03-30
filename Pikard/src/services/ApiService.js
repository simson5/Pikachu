export class ApiService {
  baseUrl;

  constructor(url) {
    this.baseUrl = url;
  }

  // Méthode GET pour récupérer des cartes avec des paramètres
  async getCards(param) {
    try {
      const response = await fetch(this.baseUrl + param);

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const cards = await response.json();
      console.log(cards, "les cartes récupérées");
      return cards;
    } catch (error) {
      console.error("Erreur lors de la récupération des cartes :", error);
      throw error;
    }
  }

  // Méthode POST pour envoyer ou modifier une carte
  async postCards(card, method, id) {
    try {
      console.log(this.baseUrl + id);
      const response = await fetch(this.baseUrl + id, {
        method: method, // "POST", "PUT", etc.
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const cards = await response.json();
      console.log(cards, "Réponse après POST");
      return cards;
    } catch (error) {
      console.error("Erreur lors de l'envoi de la carte :", error);
      throw error;
    }
  }

  // Méthode DELETE pour supprimer une carte
  async deleteCards(id) {
    try {
      console.log(this.baseUrl + id);
      const response = await fetch(this.baseUrl + id, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      // Certaines API ne renvoient pas de contenu après une suppression
      if (response.status === 204) {
        console.log("Carte supprimée avec succès");
        return { message: "Carte supprimée avec succès" };
      }

      const cards = await response.json();
      console.log(cards, "Réponse après suppression");
      return cards;
    } catch (error) {
      console.error("Erreur lors de la suppression de la carte :", error);
      throw error;
    }
  }
    // // truc va comprendre un id precise aussi pour identifier
    // async putPikas(pika, truc) {
    //     console.log(this.baseUrl+truc);
    //     const reponse = await fetch(this.baseUrl+truc, {
    //          method: "PUT",
    //          headers: {"Content-Type": "application/json"}, 
    //          body: JSON.stringify(pika)
    //         });

    //     if (!reponse.ok) {
    //         throw new Error(`Erreur HTTP : ${reponse.status}`);
    //     }
        
    //     const pikas = await reponse.json();
    //     console.log(pikas);
    //     return pikas;
    // }

    
    // truc va comprendre un id precise aussi pour identifier
    async deleteCards(truc) {
        console.log(this.baseUrl+truc, "delete truc");
        const reponse = await fetch(this.baseUrl+truc, { method: "DELETE" });

        if (!reponse.ok) {
            throw new Error(`Erreur HTTP : ${reponse.status}`);
        }
        
        const cards = await reponse.json();
        console.log(cards);
        return cards;
    }

}
