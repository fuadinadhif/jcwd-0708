function errorHandling() {
  try {
    console.log(1);
    console.log(2);
    console.log(3);
    // throw new Error("Error bikin-bikin");
    throw new Date("2025-01-01");
    console.log(4);
    console.log(5);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

errorHandling();
