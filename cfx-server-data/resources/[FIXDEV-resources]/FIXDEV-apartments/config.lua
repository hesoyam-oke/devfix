
MenuData = {
  apartment_check = {
    {
      title = "Apartment",
      description = "Forclose Apartment",
      key = "judge",
      children = {
          { title = "Yes", action = "FIXDEV-apartments:handler", key = { forclose = true} },
          { title = "No", action = "FIXDEV-apartments:handler", key = { forclose = false } },
      }
    }
  }
}
