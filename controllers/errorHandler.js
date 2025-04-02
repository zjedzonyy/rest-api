function errorHandler(err, req, res, next) {
  // Logs for devs
  console.error(err.stack);

  // Handle known Prisma erros
  if (err.name === "PrismaClientKnownRequestError") {
    switch (err.code) {
      case "P2002": // Unique constraint violation
        const target = err.meta?.target;
        if (target && target.includes("username")) {
          return res.status(409).json({
            error: "Username already exists, choose different username.",
          });
        }

        return res.status(409).json({
          error: "Given data are already in use",
        });

      case "P2025": // Record not found
        return res.status(404).json({
          error: "Couldn't find requested data",
        });

      case "P2003": // Foreign key constraint failed
        return res.status(400).json({
          error: "Invalid relations between data",
        });
    }
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Given data contain is not valid",
      details: err.errors,
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalild authorization token" });
  }

  res.status(500).json({
    error: "Server internal problem. Please try again later.",
  });
}

module.exports = errorHandler;
