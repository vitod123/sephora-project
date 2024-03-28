namespace CleanArchitecture.Application.Dtos.Characteristics;

public record CreateCharacteristicDto(
    string NameEn = "",
    string NameUa = "",
    string ValueEn = "",
    string ValueUa = ""
);
