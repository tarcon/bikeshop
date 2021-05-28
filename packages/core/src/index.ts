//entities
export { Bike } from "./domain/Bike"
export { aBike } from "./domain/Bike.fixture"
export { Cart } from "./domain/Cart"
export { Product } from "./domain/Product"
export { oneBikeInCart } from "./domain/CountableProduct.fixture"

//capabilities
export { DisplaysWelcome } from "./application/interfaces/DisplaysWelcome"
export { DisplaysBikes } from "./application/interfaces/DisplaysBikes"
export { DisplaysCart } from "./application/interfaces/DisplaysCart"
export { DisplaysError } from "./application/interfaces/DisplaysError"

export { ProvidesBike } from "./application/interfaces/ProvidesBike"
export { ProvidesBikes } from "./application/interfaces/ProvidesBikes"

export * from "./application/interfaces/StoresCart"
export * from "./application/interfaces/LoadsCart"

//use cases
export { AddBikeToCart } from "./application/AddBikeToCart"
export { AddBikeToCartInput } from "./application/AddBikeToCart.in"
export {
   AddBikeToCartOutput,
   AddBikeToCartCartBikeOutput,
} from "./application/AddBikeToCart.out"

export { RemoveBikeFromCart } from "./application/RemoveBikeFromCart"
export * from "./application/RemoveBikeFromCart.in"
export * from "./application/RemoveBikeFromCart.out"

export { SeeBikes } from "./application/SeeBikes"

export { SeeWelcome } from "./application/SeeWelcome"

//presenter
export * from "./adapters/WelcomePresenter"
export * from "./adapters/WelcomeViewModel"
export * from "./adapters/CartPresenter"
export * from "./adapters/CartViewModel"
export * from "./adapters/BikesPresenter"
export * from "./adapters/BikesViewModel"

//adapters
export { CartStorageGateway } from "./adapters/CartStorageGateway"
export { BikeBackendGateway } from "./adapters/BikeBackendGateway"
export { StoredBikeDto } from "./adapters/dto/StoredBikeDto"
export { PresentableBike } from "./application/SeeBikes"
export { PresentableBikes } from "./application/SeeBikes"
export { RemoveBikeFromCartOutput } from "./application/RemoveBikeFromCart"
