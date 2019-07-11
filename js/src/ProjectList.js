class ProjectList {
  constructor(container) {
    this.container = container;
  }
  listSlides() {

    let docRef = db.collection("slides");

    docRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log('doc:', doc.data())
      })

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    return this;
  }
}
