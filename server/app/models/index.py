from .user import User  # Import the User model

# Add future models here as they are created
# Example:
# from .game import Game
# from .word import Word

"""
Model Registry:

It serves as a centralized location where all models 
(e.g., User, Game, Word) are imported and re-exported. 
This makes it easier to manage and reference models throughout the project.

Model Aggregator:

It aggregates all models into a single module, allowing developers to import
 multiple models from one place instead of importing them individually from 
 their respective files.
"""

__all__ = ["User"]  # Add future models to this list as well