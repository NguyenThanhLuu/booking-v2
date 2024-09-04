import supabase, { supabaseUrl } from "./supabase";

async function getAllCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("Delete Error!");
  return data;
}

async function addNewCabin(cabinData) {
  const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin_imgs/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabinData, image: imagePath }])
    .select();
  if (error) {
    throw new Error("Insert new cabin failed!");
  }

  const { error: errorUploadImg } = await supabase.storage
    .from("cabin_imgs")
    .upload(imageName, cabinData.image);

  if (errorUploadImg) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error(
      "Cabin image couldn't be uploaded and the cabin was not created"
    );
  }

  return data;
}

async function updateCabin(cabinData) {
  const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin_imgs/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .update({
      ...cabinData,
      image: cabinData.image.name ? imagePath : cabinData.image,
    })
    .eq("id", cabinData.id)
    .select();

  if (error) throw new Error("Update cabin failed");

  if (cabinData.image.name) {
    const { error: errorUploadImg } = await supabase.storage
      .from("cabin_imgs")
      .upload(imageName, cabinData.image);

    if (errorUploadImg) {
      await supabase.from("cabins").delete().eq("id", data[0].id);
      throw new Error(
        "Cabin image couldn't be uploaded and the cabin was not created"
      );
    }
  }
  return data;
}

async function duplicateCabin(cabinData) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabinData])
    .select();
  if (error) {
    throw new Error("Duplicate cabin failed!");
  }
  return data;
}

export { getAllCabins, deleteCabin, addNewCabin, updateCabin, duplicateCabin };
