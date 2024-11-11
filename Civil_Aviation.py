
from pydantic import BaseModel
from typing import List
import numpy as np


class Civil_Aviation(BaseModel):
  departing_port: str
  arriving_port: str
  airline: str
  month: int
  year: int


class Config:

  allow_population_by_field_name = True
