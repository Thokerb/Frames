// using Newtonsoft.Json;
// using Newtonsoft.Json.Linq;
// using Frames.Model.ValueTypes;
// using System.Collections.Generic;
// using System.Linq;
// using System;
// using System.Collections;
// using Google.Protobuf.WellKnownTypes;
// using Type = System.Type;
//
// namespace Frames.ReelConnector.Converter;
//
// public class BagConverter : JsonConverter<Bag>
// {
//     public override bool CanWrite { get; } = false;
//
//     public override void WriteJson(JsonWriter writer, Bag value, JsonSerializer serializer)
//     {
//     }
//
//     public override Bag ReadJson(JsonReader reader, Type objectType, Bag existingValue, bool hasExistingValue, JsonSerializer serializer)
//     {
//         
//         var bag = JToken.Load(reader).ToObject<Bag>();
//
//
//         foreach (List<object?> bagInput in bag.Inputs.Values)
//         {
//             for (int i = 0; i < bagInput.Count; i++)
//             {
//                 
//                 // we need to recursively go down with different types jarray jobject and parse to list / object, also parent l
//                 
//                 if (bagInput[i] is JArray array)
//                 {
//                     bagInput[i] = new List<KeyValuePair<string, object>>(array.Select(x =>
//                         new KeyValuePair<string, object>(x.First.Last.ToObject<string>(), x.Last.Last.ToObject<object>())));
//                     
//                 }
//             }
//         }
//         return bag;
//
//     }
//     
//
//
// }