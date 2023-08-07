import Image from 'next/image'
import ConsoleImage from '../../public/Console-image-category.jpg'
import AccessoriesImage from '../../public/Accessories-image-category.jpg'
import ControllersImage from '../../public/Controllers-image-category.jpg'
import PCImage from '../../public/PC-image-category.jpg'
import Link from 'next/link'
import MultiItemCarousel from './components/carusel'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-8">
      <div className='rounded-[30px] bg-slate-700 p-12'>
        <div>
          <h1 className='font-bold text-3xl py-6'>Shop by category</h1>
        </div>

        <div className=" flex flex-wrap justify-center flex-row p-4 w-full h-full gap-4">

          <div className="flex justify-center w-300 min-w-250 hover:scale-110">
            <Link className='flex flex-col items-center' href={'/'}>
              <Image className='rounded-[30px] h-full' width={250} height={300} src={ConsoleImage} alt={''} />
              <p className='text-lg'>Console</p>
            </Link>
          </div>

          <div className="flex justify-center w-300 min-w-250 hover:scale-110">
            <Link className='flex flex-col items-center' href={'/'}>
              <Image className='rounded-[30px] h-full' width={250} height={300} src={ControllersImage} alt={''} />
              <p className='text-lg'>Controllers</p>
            </Link>
          </div>

          <div className="flex justify-center w-300 min-w-250 hover:scale-110">
            <Link className='flex flex-col items-center' href={'/'}>
              <Image className='rounded-[30px] h-full' width={250} height={300} src={PCImage} alt={''} />
              <p className='text-lg'>Gamers PC</p>
            </Link>
          </div>

          <div className="flex justify-center w-300 min-w-250 hover:scale-110">
            <Link className='flex flex-col items-center' href={'/'}>
              <Image className='rounded-[30px] h-full' width={250} height={300} src={AccessoriesImage} alt={''} />
              <p className='text-lg'>Accessories</p>
            </Link>
          </div>

        </div>
      </div>

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 ">
        <div>
          <h1 className='font-bold text-3xl py-6'>Best sales</h1>
        </div>

        <MultiItemCarousel />
      </div>

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 ">
        <div>
          <h1 className='font-bold text-3xl py-6'>Hot discounts</h1>
        </div>

        <MultiItemCarousel />
      </div>

    </main>

  )
}
