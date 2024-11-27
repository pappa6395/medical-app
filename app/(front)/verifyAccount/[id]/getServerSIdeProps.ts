export async function getServerSideProps(context: { params: { id: string } }) {
    return {
      props: {
        params: context.params,
      },
    };
  }